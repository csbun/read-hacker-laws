import 'dart:convert';
import 'package:flutter/services.dart' show rootBundle;

class MdAssetsLang {
  static const String EN = "en";
  static const String CN = "cn";
}

class MdAssets {
  static late Map<String, dynamic> _resourceMeta;
  // static final AssetBundle bdl = _initRoo

  static init() async {
    String resourcesMetaString =
        await rootBundle.loadString("assets/s/index.json");
    _resourceMeta = json.decode(resourcesMetaString);
    // _resourceMeta = await rootBundle.loadStructuredData<Map<String, int>>(
    //     "s/index.json", (s) => json.decode(s));
  }

  static int getPageCount(String lang) {
    return _resourceMeta[lang] ?? 0;
  }

  static Future<String> readFile(String lang, int pageNum) async {
    final _pageCount = getPageCount(lang);
    final preFileName =
        "00" + (pageNum >= _pageCount ? _pageCount - 1 : pageNum).toString();
    final fileName = preFileName.substring(preFileName.length - 2);
    final content = await rootBundle.loadString("assets/s/$lang/$fileName");
    // final file = File('${directory.path}/lib/resources/$filename');
    // final content = await file.readAsString();
    return content;
  }
}
