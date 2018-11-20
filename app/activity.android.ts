import * as app from "tns-core-modules/application";
import {setActivityCallbacks, AndroidActivityCallbacks} from "tns-core-modules/ui/frame";

@JavaProxy("org.test.test.MainActivity")
class MainActivity extends android.support.v7.app.AppCompatActivity {
    private _callbacks: AndroidActivityCallbacks;
    public readonly MY_PERMISSION_REQUEST = 100;

    public onCreate(savedInstanceState: android.os.Bundle): void {
        if (!this._callbacks) {
            setActivityCallbacks(this);
        }

        this._callbacks.onCreate(this, savedInstanceState, super.onCreate);

        let intent: android.content.Intent = new android.content.Intent( ( <any> android.provider.Settings ).ACTION_HOME_SETTINGS );
        let activity = app.android.foregroundActivity || app.android.startActivity;
        activity.startActivityForResult( intent, this.MY_PERMISSION_REQUEST );
    }

    public onSaveInstanceState(outState: android.os.Bundle): void {
        this._callbacks.onSaveInstanceState(this, outState, super.onSaveInstanceState);
    }

    public onStart(): void {
        this._callbacks.onStart(this, super.onStart);
    }

    public onStop(): void {
        this._callbacks.onStop(this, super.onStop);
    }

    public onDestroy(): void {
        this._callbacks.onDestroy(this, super.onDestroy);
    }

    public onBackPressed(): void {
        this._callbacks.onBackPressed(this, super.onBackPressed);
    }

    public onRequestPermissionsResult(requestCode: number, permissions: Array<string>, grantResults: Array<number>): void {
        this._callbacks.onRequestPermissionsResult(this, requestCode, permissions, grantResults, undefined /*TODO: Enable if needed*/);
    }

    public onActivityResult(requestCode: number, resultCode: number, data: android.content.Intent): void {
        this._callbacks.onActivityResult(this, requestCode, resultCode, data, super.onActivityResult);
    }
}

