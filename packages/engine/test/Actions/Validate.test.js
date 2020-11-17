/*
  Copyright 2020 Lowdefy, Inc

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import testContext from '../testContext';

const pageId = 'one';
const rootContext = {};

test('Validate', async () => {
  const rootBlock = {
    blockId: 'root',
    meta: {
      category: 'context',
    },
    areas: {
      content: {
        blocks: [
          {
            blockId: 'text1',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: '12', key: 'text1' } },
                message: 'text1 does not match pattern 12',
              },
            ],
          },
          {
            blockId: 'text2',
            type: 'TextInput',
            meta: {
              category: 'input',
              valueType: 'string',
            },
            validate: [
              {
                pass: { _regex: { pattern: '123', key: 'text1' } },
                message: 'text1 does not match pattern 123',
              },
            ],
          },
          {
            blockId: 'button',
            type: 'Button',
            meta: {
              category: 'display',
            },
            actions: {
              onClick: [
                {
                  id: 'action1',
                  type: 'Validate',
                  params: 'text1',
                  error: 'Error validating text1',
                  success: 'Success validating text1',
                },
                {
                  id: 'action2',
                  type: 'Validate',
                  params: 'text2',
                  error: 'Error validating text2',
                  success: 'Success validating text2',
                },
              ],
            },
          },
        ],
      },
    },
  };
  const context = testContext({
    rootContext,
    rootBlock,
    pageId,
    initState: { a: 'init' },
  });
  const { button, text1 } = context.RootBlocks.map;
  expect(text1.validationEval.output).toEqual({
    errors: ['text1 does not match pattern 12'],
    status: null,
    warnings: [],
  });
  context.showValidationErrors = true;
  context.update();
  expect(text1.validationEval.output).toEqual({
    errors: ['text1 does not match pattern 12'],
    status: 'error',
    warnings: [],
  });
  await button.callAction({ action: 'onClick' });
  expect(button.BlockActions.actions.onClick.calls[0].error).toEqual([
    {
      args: undefined,
      error: null,
      errorMessage: 'Error validating text1',
      id: 'action1',
      params: 'text1',
      skipped: false,
      type: 'Validate',
    },
  ]);
  text1.setValue('12');
  await button.callAction({ action: 'onClick' });
  expect(button.BlockActions.actions.onClick.calls[0].error).toEqual([
    {
      args: undefined,
      error: null,
      errorMessage: 'Error validating text2',
      id: 'action2',
      params: 'text2',
      skipped: false,
      type: 'Validate',
    },
    {
      args: undefined,
      error: null,
      id: 'action1',
      params: 'text1',
      skipped: false,
      successMessage: 'Success validating text1',
      type: 'Validate',
    },
  ]);
  text1.setValue('123');
  await button.callAction({ action: 'onClick' });
  expect(button.BlockActions.actions.onClick.calls[0].success).toEqual([
    'Success validating text2',
    'Success validating text1',
  ]);
  text1.setValue('');
  await button.callAction({ action: 'onClick' });
  expect(button.BlockActions.actions.onClick.calls[0].error).toEqual([
    {
      args: undefined,
      error: null,
      errorMessage: 'Error validating text1',
      id: 'action1',
      params: 'text1',
      skipped: false,
      type: 'Validate',
    },
  ]);
});
