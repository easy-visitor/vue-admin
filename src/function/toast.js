import {Message, MessageBox} from 'element-ui';


export default {
    error(msg) {
        Message.error(msg);
    },
    success(msg) {
        Message.success(msg);
    },
    confirm(content, callback, title) {
        MessageBox.confirm('确定' + content + '是否继续?', title || '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            return callback()
        }).catch(() => {

        });
    }

}
