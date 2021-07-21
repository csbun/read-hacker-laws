import 'package:read_hacker_laws/md_assets.dart';
import 'package:shared_preferences/shared_preferences.dart';

class LocalStore {
  static late SharedPreferences _prefs;

  static init() async {
    _prefs = await SharedPreferences.getInstance();
  }

  static setLang(String lang) async {
    await _prefs.setString("LANG", lang);
  }

  static String getLang() {
    String? lang = _prefs.getString("LANG");
    return lang ?? MdAssetsLang.EN;
  }

  static setPage(int pageNum) async {
    await _prefs.setInt("PAGE_NUM", pageNum);
  }

  static getPage() {
    int? pageNum = _prefs.getInt("PAGE_NUM");
    return pageNum ?? 0;
  }
}
