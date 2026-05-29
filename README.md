<!-- markdownlint-disable-file -->

# 🧧 3D折り紙チュートリアル - ツルの折り方

Vanilla JavaScript + Three.js を使用した、立体的な3Dアニメーションでツルの折り方を紹介するインタラクティブなWebページです。

## 🌟 特徴

- **3D立体アニメーション**: Three.jsによるリアルな3D折り紙アニメーション
- **段階的なガイド**: 9つのステップで分かりやすく折り方を説明
- **インタラクティブ操作**: 次へ/前へボタンでステップを移動
- **自動再生機能**: 再生ボタンで全ステップを自動で進行
- **レスポンシブデザイン**: スマートフォンから大型画面まで対応
- **Vanilla JavaScript**: フレームワークに依存しないピュアなJavaScript実装

## 📋 折り方ステップ

1. **ステップ 1**: 準備 - 正方形の紙を用意
2. **ステップ 2**: 三角形に折る - 対角線で折ります
3. **ステップ 3**: 二等辺三角形に折る
4. **ステップ 4**: ダイヤモンド形に整える
5. **ステップ 5**: さらに折る
6. **ステップ 6**: ��と尾を作る
7. **ステップ 7**: 翼を広げる
8. **ステップ 8**: 足を作る
9. **ステップ 9**: 完成！

## 🚀 使用方法

### ローカル実行

1. リポジトリをクローン
```bash
git clone https://github.com/d-muranaka/origami-crane-3d.git
cd origami-crane-3d
```

2. ローカルサーバーを起動（Python）
```bash
python -m http.server 8000
```

3. ブラウザで開く
```
http://localhost:8000
```

### GitHub Pages デプロイ

このリポジトリをGitHub Pagesで公開するには、リポジトリ設定からPages機能を有効にしてください。

## 🎮 操作方法

- **←  前へボタン**: 前のステップに戻る
- **▶ 再生ボタン**: 全ステップを自動で再生
- **次へ → ボタン**: 次のステップに進む
- **ステップリスト**: リスト内の任意のステップをクリックして移動

## 🛠️ 技術スタック

- **HTML5**: ページ構造
- **CSS3**: スタイリングとレスポンシブデザイン
- **Vanilla JavaScript**: ロジック実装
- **Three.js**: 3D描画とアニメーション

## 📁 ファイル構成

```
origami-crane-3d/
├── index.html       # HTMLテンプレート
├── styles.css       # スタイルシート
├── origami.js       # メインアプリケーション
└── README.md        # このファイル
```

## 🎨 デザイン

- モダンで親しみやすいUI
- グラデーション背景で視覚的に魅力的
- ダークモードに対応可能（CSSカスタムプロパティ利用）
- タッチデバイス対応

## 📱 ブラウザ対応

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- スマートフォンブラウザ (iOS Safari, Chrome Mobile)

## 🔧 カスタマイズ

### ステップの追加・編集

`origami.js` の `steps` 配列を編集してください：

```javascript
const steps = [
    {
        title: "ステップ タイトル",
        description: "説明テキスト",
        hint: "ヒント",
        animation: "animationType"
    },
    // ...
];
```

### アニメーション追加

`playAnimation()` 関数に新しいアニメーションケースを追加：

```javascript
case 'customAnimation':
    await animateFold(duration, (progress) => {
        // カスタムアニメーション処理
    });
    break;
```

### 色のカスタマイズ

`styles.css` の CSS カスタムプロパティを編集：

```css
:root {
    --primary-color: #e74c3c;
    --secondary-color: #3498db;
    --accent-color: #f39c12;
    /* ... */
}
```

## 📝 ライセンス

MIT License

## 👨‍💻 作成者

d-muranaka

## 🤝 貢献

バグ報告や機能提案はIssuesセクションでお願いします。プルリクエストも歓迎します！

## 📚 参考資料

- [Three.js Documentation](https://threejs.org/docs/)
- [MDN Web Docs - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [CSS-Tricks](https://css-tricks.com/)

---

ツルの折り方を楽しく学んでください！🎉