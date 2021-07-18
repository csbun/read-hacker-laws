import 'dart:convert';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter_markdown/flutter_markdown.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart' show rootBundle;
import 'package:google_mobile_ads/google_mobile_ads.dart';
import 'package:read_hacker_laws/ad_helper.dart';

late Map<String, dynamic> resourceMeta;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  MobileAds.instance.initialize();
  String resourcesMetaString = await rootBundle.loadString("s/index.json");
  resourceMeta = json.decode(resourcesMetaString);
  // resourceMeta = await rootBundle.loadStructuredData<Map<String, int>>(
  //     "s/index.json", (s) => json.decode(s));
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hacker Laws',
      theme: ThemeData(
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'Hacker Laws'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  late String _lang = "en";
  late String _content = '';
  late int _pageCount = 0;
  late BannerAd _bannerAd;

  @override
  void initState() {
    super.initState();
    // 加载数据
    _pageCount = resourceMeta[_lang] ?? 0;

    // 加载广告
    if (AdHelper.bannerAdUnitId != '') {
      _bannerAd = BannerAd(
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
      _bannerAd.load();
    }
  }

  Future<String> _readMarkdown(int fileNum) async {
    final preFileName =
        "00" + (fileNum > _pageCount ? _pageCount : fileNum).toString();
    final fileName = preFileName.substring(preFileName.length - 2);
    final contents = await rootBundle.loadString('s/$_lang/$fileName');
    // final file = File('${directory.path}/lib/resources/$filename');
    // final contents = await file.readAsString();
    return contents;
  }

  futureMarkdownBuilder(int fileNum) {
    return FutureBuilder(
      future: _readMarkdown(fileNum),
      builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
        /*表示数据成功返回*/
        if (snapshot.hasData) {
          return Markdown(data: snapshot.data ?? "");
        } else {
          return Text("Loading");
        }
      },
    );
  }

  void _showFile() async {
    setState(() {
      _content = "fileString";
    });
  }

  @override
  Widget build(BuildContext context) {
    // final AdWidget adWidget =

    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(
      appBar: AppBar(
        // Here we take the value from the MyHomePage object that was created by
        // the App.build method, and use it to set our appbar title.
        title: Text(widget.title),
      ),
      body: Builder(
        builder: (context) {
          final double height = MediaQuery.of(context).size.height;
          return CarouselSlider.builder(
            itemCount: _pageCount,
            options: CarouselOptions(
              height: height,
              viewportFraction: 1.0,
              enlargeCenterPage: false,
              // onPageChanged: (index, reason) async {
              //   setState(() {
              //     _content = '';
              //   });
              //   final fileString = await _readMarkdown(index);
              //   setState(() {
              //     _content = fileString;
              //   });
              // },
              // autoPlay: false,
            ),
            itemBuilder: (ctx, index, realIdx) {
              return futureMarkdownBuilder(index);
              // return MarkdownBody(data: _content);
            },
          );
        },
      ),
      bottomSheet: Container(
        alignment: Alignment.center,
        child: AdHelper.bannerAdUnitId != '' ? AdWidget(ad: _bannerAd) : null,
        // width: _bannerAd.size.width.toDouble(),
        // height: _bannerAd.size.height.toDouble(),
        height: 72.0,
      ),
      // Center(
      //   // Center is a layout widget. It takes a single child and positions it
      //   // in the middle of the parent.
      //   child: Column(
      //     // Column is also a layout widget. It takes a list of children and
      //     // arranges them vertically. By default, it sizes itself to fit its
      //     // children horizontally, and tries to be as tall as its parent.
      //     //
      //     // Invoke "debug painting" (press "p" in the console, choose the
      //     // "Toggle Debug Paint" action from the Flutter Inspector in Android
      //     // Studio, or the "Toggle Debug Paint" command in Visual Studio Code)
      //     // to see the wireframe for each widget.
      //     //
      //     // Column has various properties to control how it sizes itself and
      //     // how it positions its children. Here we use mainAxisAlignment to
      //     // center the children vertically; the main axis here is the vertical
      //     // axis because Columns are vertical (the cross axis would be
      //     // horizontal).

      //     mainAxisAlignment: MainAxisAlignment.start,
      //     children: <Widget>[
      //     ],
      //   ),
      // ),
      floatingActionButton: FloatingActionButton(
        onPressed: _showFile,
        tooltip: 'Increment',
        child: Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
