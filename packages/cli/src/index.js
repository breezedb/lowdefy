#!/usr/bin/env node
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

const nodeMajorVersion = process.version.split(/^v(\d+)/)[1];
if (Number(nodeMajorVersion) < 14) {
  // TODO: This error handled with telemetry.
  throw new Error(
    `Nodejs versions below v14 are not supported. You are using ${process.version}. Update Nodejs to the latest LTS version to use Lowdefy.`
  );
}
async function run() {
  const { default: program } = await import('./program.js');
  program.parse(process.argv);
}

run().then(() => {});
