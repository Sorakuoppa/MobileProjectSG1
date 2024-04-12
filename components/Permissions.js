import { useCameraPermissions } from "expo-image-picker";
import { createContext, useContext } from "react";
import * as ImagePicker from 'expo-image-picker';


export const PermissionContext = createContext();

export const PermissionProvider = ({children}) => {
    const [mediaLibararyStatus, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();
    const [cameraStatus, requestCameraPermission] = ImagePicker.useCameraPermissions();

    return (
        <PermissionContext.Provider value={{mediaLibararyStatus,
            requestCameraPermission,requestMediaPermission,cameraStatus}}>
            {children}
        </PermissionContext.Provider>
    )
}