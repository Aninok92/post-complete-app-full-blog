import { NotificationTypes, StatusTypes } from "../types/types";

export function notificationMessage(requestStatus: StatusTypes, requestError: string): NotificationTypes {
    let notification: NotificationTypes | null = null;

    if (requestStatus === "pending") {
        notification = {
          status: "pending",
          title: "Sending message",
          message: "Your message is ont its way!",
        };
      }
    
      if (requestStatus === "success") {
        notification = {
          status: "success",
          title: "Success!",
          message: "Message sent successfully!",
        };
      }
    
      if (requestStatus === "error") {
        notification = {
          status: "error",
          title: "Error",
          message: requestError,
        };
      }

      return notification   
}