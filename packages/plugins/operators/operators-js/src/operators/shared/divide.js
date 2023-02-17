/*
  Copyright 2020-2023 Lowdefy, Inc

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

import { type } from '@lowdefy/helpers';

function _divide({ params, location }) {
  if (!type.isArray(params)) {
    throw new Error(
      `Operator Error: _divide takes an array type as input. Received: ${JSON.stringify(
        params
      )} at ${location}.`
    );
  }
  if (params.length !== 2) {
    throw new Error(
      `Operator Error: _divide takes an array of length 2 as input. Received: ${JSON.stringify(
        params
      )} at ${location}.`
    );
  }
  if (!type.isNumber(params[0]) || !type.isNumber(params[1])) {
    throw new Error(
      `Operator Error: _divide takes an array of 2 numbers. Received: ${JSON.stringify(
        params
      )} at ${location}.`
    );
  }
  if (params[1] === 0) {
    throw new Error(
      `Operator Error: _divide by zero not allowed. Received: ${JSON.stringify(
        params
      )} at ${location}.`
    );
  }
  return params[0] / params[1];
}

export default _divide;
