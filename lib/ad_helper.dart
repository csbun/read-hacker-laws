import 'dart:io';
import 'package:google_mobile_ads/google_mobile_ads.dart';

class AdHelper {
  static const double BANNER_HEIGHT = 72.0;

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

  static BannerAd buildBannerAd() {
    final bannerAd = BannerAd(
      size: AdSize.banner,
      // adUnitId: 'ca-app-pub-6414613701003177/6350644870',
      adUnitId: AdHelper.bannerAdUnitId,
      listener: BannerAdListener(onAdLoaded: (Ad ad) {
        print('$BannerAd loaded.');
      }, onAdFailedToLoad: (Ad ad, error) {
        ad.dispose();
        print('Ad load failed (code=${error.code} message=${error.message})');
      }),
      request: AdRequest(),
    );
    bannerAd.load();
    return bannerAd;
  }
}
