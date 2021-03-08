/*
 * @Title: actions
 * @Descripttion: 
 * @Author: shaojihao
 */

import { PROCESS_ENV_NODE_ENV } from '@/util/const';
import { findElementsByUri } from '@/api/index.js';
import * as type from './mutation-types';
import devNodes from '@/mock/nodes.js';

export default {
  async getNode({
    commit
  }, data) {
    if (PROCESS_ENV_NODE_ENV) {
      const res = await findElementsByUri({uri: data});
      commit(type.SET_NODE, res.data);
    } else commit(type.SET_NODE, devNodes);
  },
};