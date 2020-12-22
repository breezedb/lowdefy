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

import React, { useState, useEffect } from 'react';
import { Drawer } from 'antd';
import { type, get } from '@lowdefy/helpers';
import { blockDefaultProps } from '@lowdefy/block-tools';

const triggerSetOpen = ({ state, setOpen, methods, rename }) => {
  if (!state) {
    methods.callAction({ action: get(rename, 'actions.onClose', { default: 'onClose' }) });
  }
  if (state) {
    methods.callAction({ action: get(rename, 'actions.onOpen', { default: 'onOpen' }) });
  }
  methods.callAction({ action: get(rename, 'actions.onToggle', { default: 'onToggle' }) });
  setOpen(state);
};

const DrawerBlock = ({ blockId, content, properties, methods, rename, onClose }) => {
  const [openState, setOpen] = useState(false);
  useEffect(() => {
    methods.registerMethod(get(rename, 'methods.toggleOpen', { default: 'toggleOpen' }), () =>
      triggerSetOpen({ state: !openState, setOpen, methods, rename })
    );
    methods.registerMethod(get(rename, 'methods.setOpen', { default: 'setOpen' }), ({ open }) =>
      triggerSetOpen({ state: !!open, setOpen, methods, rename })
    );
  });
  return (
    <Drawer
      id={blockId}
      closable={properties.closable}
      getContainer={properties.getContainer}
      mask={properties.mask}
      maskClosable={properties.maskClosable}
      title={properties.title}
      visible={type.isBoolean(properties.open) ? properties.open : openState}
      width={properties.width}
      height={properties.height}
      zIndex={properties.zIndex}
      placement={properties.placement}
      keyboard={properties.keyboard}
      onClose={onClose || (() => triggerSetOpen({ state: false, setOpen, methods, rename }))}
      drawerStyle={methods.makeCssClass(properties.drawerStyle, { styleObjectOnly: true })}
      headerStyle={methods.makeCssClass(properties.headerStyle, { styleObjectOnly: true })}
      bodyStyle={methods.makeCssClass(properties.bodyStyle, { styleObjectOnly: true })}
      maskStyle={methods.makeCssClass(properties.maskStyle, { styleObjectOnly: true })}
    >
      {content.content && content.content()}
    </Drawer>
  );
};

DrawerBlock.defaultProps = blockDefaultProps;

export default DrawerBlock;