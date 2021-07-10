import 'dart:io';

class AdHelper {
  static String get bannerAdUnitId {
    try {
      if (Platform.isAndroid) {
        return 'ca-app-pub-6414613701003177/2820617497';
      } else if (Platform.isIOS) {
        return 'ca-app-pub-6414613701003177/6350644870';
      }
    } catch (err) {
      // throw new UnsupportedError("Admob Unsupported platform");
    }
    return '';
  }
}
