// ===== 3D折り紙チュートリアル - ツル =====
// Three.jsを使用した立体的なアニメーション

// ===== ステップデータ定義 =====
const steps = [
    {
        title: "ステップ 1: 準備",
        description: "正方形の紙を用意します。両面が見えるように置きましょう。",
        hint: "紙が正方形であることを確認してください",
        animation: "initial"
    },
    {
        title: "ステップ 2: 三角形に折る",
        description: "正方形を対角線で折ります。右上の角を左下の角に合わせて折ってください。",
        hint: "角をしっかり合わせて、角を揃えることが大切です",
        animation: "foldDiagonal"
    },
    {
        title: "ステップ 3: 二等辺三角形に折る",
        description: "折った状態から、右の頂点を左の頂点に合わせて折ります。",
        hint: "もう一度三角形を折ります",
        animation: "foldToIsosceles"
    },
    {
        title: "ステップ 4: ダイヤモンド形に整える",
        description: "一度広げて、全ての角を中心に向かって折ります。",
        hint: "四隅が中心に集まるように折ります",
        animation: "foldToDiamond"
    },
    {
        title: "ステップ 5: さらに折る",
        description: "もう一度、上と下の角を中心に折ります。",
        hint: "対称に折ることが重要です",
        animation: "foldAgain"
    },
    {
        title: "ステップ 6: 首と尾を作る",
        description: "中央の線で折り、片方を引き出して首と尾を作ります。",
        hint: "慎重に引き出して、形を整えます",
        animation: "createNeckTail"
    },
    {
        title: "ステップ 7: 翼を広げる",
        description: "両側から翼を広げます。軽く引き出すようにしましょう。",
        hint: "翼は対称に広がります",
        animation: "spreadWings"
    },
    {
        title: "ステップ 8: 足を作る",
        description: "下部から小さく折り出して足を作ります。両側に足を作ります。",
        hint: "小さく折り出すことがコツです",
        animation: "createLegs"
    },
    {
        title: "ステップ 9: 完成！",
        description: "全体を整えて、ツルが完成しました！回転させてみましょう。",
        hint: "おめでとうございます！美しいツルができました",
        animation: "complete"
    }
];

// ===== Three.js セットアップ =====
let scene, camera, renderer;
let paperGroup;
let currentStep = 0;
let isAnimating = false;
let autoPlayInterval = null;

function initThreeJS() {
    const canvas = document.getElementById('canvas3d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    // シーンの作成
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f7fa);

    // カメラの設定
    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 3);

    // レンダラーの設定
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // ライティング
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    scene.add(directionalLight);

    // 紙グループ
    paperGroup = new THREE.Group();
    scene.add(paperGroup);

    // 初期紙の作成
    createPaper();

    // ウィンドウリサイズ対応
    window.addEventListener('resize', onWindowResize);

    // アニメーションループ
    animate();
}

function createPaper() {
    // 既存の紙を削除
    paperGroup.clear();

    // 正方形の紙ジオメトリ
    const geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    const material = new THREE.MeshPhongMaterial({
        color: 0xff6b6b,
        side: THREE.DoubleSide,
        flatShading: false,
        wireframe: false
    });

    const paper = new THREE.Mesh(geometry, material);
    paperGroup.add(paper);
}

function animate() {
    requestAnimationFrame(animate);

    // 紙を回転させる（アニメーション中は停止）
    if (paperGroup && !isAnimating) {
        paperGroup.rotation.x += 0.003;
        paperGroup.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}

function onWindowResize() {
    const canvas = document.getElementById('canvas3d');
    const width = canvas.parentElement.clientWidth;
    const height = canvas.parentElement.clientHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// ===== アニメーション関数群 =====
async function playAnimation(animationType) {
    if (isAnimating) return;
    isAnimating = true;

    const duration = 1500; // ミリ秒

    switch (animationType) {
        case 'initial':
            // 初期状態：回転のみ
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;

        case 'foldDiagonal':
            // 対角線で折る
            await animateFold(duration, (progress) => {
                const rotation = progress * Math.PI / 4;
                paperGroup.rotation.z = rotation;
            });
            break;

        case 'foldToIsosceles':
            // 二等辺三角形に折る
            await animateFold(duration, (progress) => {
                const rotation = progress * Math.PI / 6;
                paperGroup.rotation.x = rotation;
            });
            break;

        case 'foldToDiamond':
            // ダイヤモンド形に折る
            await animateFold(duration, (progress) => {
                const scaleY = 1 - progress * 0.3;
                paperGroup.scale.y = scaleY;
                paperGroup.rotation.z = progress * Math.PI / 8;
            });
            break;

        case 'foldAgain':
            // さらに折る
            await animateFold(duration, (progress) => {
                const rotation = progress * Math.PI / 5;
                paperGroup.rotation.x = rotation;
                paperGroup.scale.z = 1 - progress * 0.4;
            });
            break;

        case 'createNeckTail':
            // 首と尾を作る
            await animateFold(duration, (progress) => {
                paperGroup.rotation.y = progress * Math.PI / 3;
                paperGroup.position.z = progress * 0.5;
            });
            break;

        case 'spreadWings':
            // 翼を広げる
            await animateFold(duration, (progress) => {
                paperGroup.rotation.x = progress * Math.PI / 4;
                paperGroup.rotation.z = progress * Math.PI / 6;
            });
            break;

        case 'createLegs':
            // 足を作る
            await animateFold(duration, (progress) => {
                paperGroup.rotation.x = progress * Math.PI / 8;
                paperGroup.scale.y = 1 - progress * 0.1;
            });
            break;

        case 'complete':
            // 完成：ゆっくり回転
            await animateFold(2000, (progress) => {
                paperGroup.rotation.y = progress * Math.PI * 2;
            });
            break;
    }

    // アニメーション終了後、状態をリセット
    isAnimating = false;
    resetPaperState();
}

function resetPaperState() {
    // 各ステップ後の状態を保持する
    paperGroup.rotation.set(0, 0, 0);
    paperGroup.scale.set(1, 1, 1);
    paperGroup.position.set(0, 0, 0);
}

async function animateFold(duration, updateFn) {
    return new Promise((resolve) => {
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // イーズイン・アウト
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            updateFn(easeProgress);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                resolve();
            }
        };

        animate();
    });
}

// ===== UIコントローラー =====
function updateUI() {
    const step = steps[currentStep];

    // ステップ情報を更新
    document.getElementById('step-title').textContent = step.title;
    document.getElementById('step-description').textContent = step.description;
    document.getElementById('animation-hint').textContent = '💡 ' + step.hint;

    // ステップインジケーターを更新
    document.getElementById('current-step').textContent = currentStep + 1;
    document.getElementById('total-steps').textContent = steps.length;

    // プログレスバーを更新
    const progress = ((currentStep + 1) / steps.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    // ボタン状態を更新
    document.getElementById('prev-btn').disabled = currentStep === 0;
    document.getElementById('next-btn').disabled = currentStep === steps.length - 1;

    // ステップリストをハイライト
    document.querySelectorAll('.step-list li').forEach((li, index) => {
        if (index === currentStep) {
            li.classList.add('active');
        } else {
            li.classList.remove('active');
        }
    });
}

function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        updateUI();
        playAnimation(steps[currentStep].animation);
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        updateUI();
        playAnimation(steps[currentStep].animation);
    }
}

function toggleAutoPlay() {
    const btn = document.getElementById('play-pause-btn');

    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
        btn.textContent = '▶ 再生';
    } else {
        btn.textContent = '⏸ 一時停止';
        autoPlayInterval = setInterval(() => {
            if (currentStep < steps.length - 1) {
                nextStep();
            } else {
                // 最後に達したら停止
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
                btn.textContent = '▶ 再生';
            }
        }, 2500);

        // 即座に最初のアニメーションを再生
        playAnimation(steps[currentStep].animation);
    }
}

// ===== イベントリスナー設定 =====
function setupEventListeners() {
    document.getElementById('prev-btn').addEventListener('click', prevStep);
    document.getElementById('next-btn').addEventListener('click', nextStep);
    document.getElementById('play-pause-btn').addEventListener('click', toggleAutoPlay);

    // ステップリストのクリックで移動
    document.querySelectorAll('.step-list li').forEach((li, index) => {
        li.addEventListener('click', () => {
            currentStep = index;
            updateUI();
            playAnimation(steps[currentStep].animation);
        });
    });
}

// ===== 初期化 =====
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    updateUI();
    setupEventListeners();

    // ページ読み込み時に最初のアニメーションを再生
    playAnimation(steps[currentStep].animation);
});
