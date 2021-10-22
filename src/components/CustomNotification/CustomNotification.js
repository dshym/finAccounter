import {notification} from "antd";

export const openNotificationWithIcon = (type, message, title) => {
    notification[type]({
        message: `${title}`,
        description: `${message}`,
    });
};
