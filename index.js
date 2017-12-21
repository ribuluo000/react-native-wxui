import * as Util from './src/Util';
import * as ProgressHUD from './src/ProgressHUD';
import { showActionSheet,hideActionSheet,isActionSheetShowing } from './src/ActionSheet';
import { showDialog,hideDialog,isDialogShowing } from './src/Dialog';
import { showAlert,hideAlert,isAlertShowing } from './src/Alert';
import { showTimePickerBox } from './src/TimePickerBox';
import { showPopMenuBox,hidePopMenuBox,isPopMenuBoxShowing } from './src/PopMenuBox';
import FilterBar from './src/FilterBar';
import * as Form from './src/Form';
// import ListView from './src/ListView';
import Button from './src/Button';
import LoadingPlaceholder from './src/LoadingPlaceholder';
import SearchBar from './src/SearchBar';
import Calendar from './src/Calendar';

/**
 *
 *
 * use:
 *
 static onBackPressed(){
        let b = false;
        if(isAlertShowing()){
            hideAlert();
            b = true;
        }
        if(isDialogShowing()){
            hideDialog();
            b = true;
        }
        if(isActionSheetShowing()){
            hideActionSheet();
            b = true;
        }
        return b;
    }

 */

export {
    Util,
    ProgressHUD,
    isActionSheetShowing,
    hideActionSheet,
    showActionSheet,

    isDialogShowing,
    hideDialog,
    showDialog,

    isAlertShowing,
    hideAlert,
    showAlert,
    showTimePickerBox,

    isPopMenuBoxShowing,
    hidePopMenuBox,
    showPopMenuBox,
    FilterBar,
    Form,
    // ListView,
    Button,
    LoadingPlaceholder,
    SearchBar,
    Calendar
}