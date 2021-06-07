import {
    Message,
    MessageBox,
    Notification
} from 'element-ui';

export default function(config) {
    if (config && config.success) {
        switch (config.success.type) {
            case 'message':
                Message(config.success.options);
                break;
            case 'messagebox':
                MessageBox(config.success.options);
                break;
            case 'notification':
                Notification(config.success.options);
                break;
            default: break;
        }
    }
};