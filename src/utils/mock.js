import config from '@/config'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import json from '@/mock'

const mock = new MockAdapter(axios)

mock.onGet(`${config.API_URL}/system/menu/myMenus`).reply(200, json.myMenus)
    .onGet(`${config.API_URL}/system/menu/list`).reply(200, json.menuList)
    .onGet(`${config.API_URL}/system/tasks/list`).reply(200, json.taskList)    
    .onGet(`${config.API_URL}/system/role/list`).reply(200, json.roleList)
    .onGet(`${config.API_URL}/system/dept/list`).reply(200, json.deptList)
    .onGet(`${config.API_URL}/system/user/list`).reply(200, json.userList)
    .onGet(`${config.API_URL}/system/dic/tree`).reply(200, json.dicTree)
    .onGet(`${config.API_URL}/system/dic/list`).reply(200, json.dicList)
    .onGet(`${config.API_URL}/system/dic/get`).reply(200, json.dicGet)
    .onGet(`${config.API_URL}/system/table/list`).reply(200, json.tableList)
    .onGet(`${config.API_URL}/system/table/info`).reply(200, json.tableInfo)
    .onGet(`${config.API_URL}/system/app/list`).reply(200, json.appList)
    .onGet(`${config.API_URL}/system/log/list`).reply(200, json.logList)
    .onGet(`${config.API_URL}/demo/ver`).reply(200, json.demoVer)
    .onGet(`${config.API_URL}/demo/page`).reply(200, json.demoPage)
    .onGet(`${config.API_URL}/demo/list`).reply(200, json.demoList)
    .onGet(`${config.API_URL}/file/list`).reply(200, json.fileList)
    .onGet(`${config.API_URL}/file/menu`).reply(200, json.fileMenu)
    .onGet(`${config.API_URL}/fileExport`).reply((config) => {
        if(config.responseType === 'blob') {
            let blob = new Blob([], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            let fakeFile = blob
            return [200, fakeFile]            
        } else {
            return [200, json.fileExport]
        }
    })
    .onPost(`${config.API_URL}/auth/token`).reply(200, json.token)
    .onPost(`${config.API_URL}/uploadFile`).reply(200, json.uploadFile)
    .onPost(`${config.API_URL}/fileImport`).reply(200, json.fileImport)
    .onPost(`${config.API_URL}/upload`).reply(200, json.upload)
    .onPost().reply((config) => {
        const res = {
            code: 200,
            data: JSON.parse(config.data),
            message: "資料更新成功！",
        }
        return [200, res]
    })
    .onAny().passThrough()

export default mock
