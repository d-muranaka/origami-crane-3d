// ===== 3D折り紙チュートリアル - ツル =====
// Three.jsを使用した立体的なアニメーション

// ===== ステップデータ定義 =====
const steps = [
    {
        title: "ステップ 1: 準備",
        description: "正方形の紙を用意します。両面が見えるように置きましょう。",
        hint: "紙が正方形であることを確認してください",
        animation: "initial",
        targetRotation: { x: 0, y: 0, z: 0 },
        targetScale: { x: 1, y: 1, z: 1 },
        targetPosition: { x: 0, y: 0, z: 0 }
    },
    {
        title: "ステップ 2: 三角形に折る",
        description: "正方形を対角線で折ります。右上の角を左下の角に合わせて折ってください。",
        hint: "角をしっかり合わせて、角を揃えることが大切です",
        animation: "foldDiagonal",
        targetRotation: { x: 0, y: 0, z: Math.PI / 4 },
        targetScale: { x: 1, y: 1, z: 1 },
        targetPosition: { x: 0, y: 0, z: 0 }
    },
    {
        title: "ステップ 3: 二等辺三角形に折る",
        description: "折った状態から、右の頂点を左の頂点に合わせて折ります。",
        hint: "もう一度三角形を折ります",
        animation: "foldToIsosceles",
        targetRotation: { x: Math.PI / 6, y: 0, z: Math.PI / 4 },
        targetScale: { x: 1, y: 1, z: 1 },
        targetPosition: { x: 0, y: 0, z: 0 }
    },
    {
        title: "ステップ 4: ダイヤモンド形に整える",
        description: "一度広げて、全ての角を中心に向かって折ります。",
        hint: "四隅が中心に集まるように折ります",
        animation: "foldToDiamond",
        targetRotation: { x: Math.PI / 6, y: 0, z: Math.PI / 4 + Math.PI / 8 },
        targetScale: { x: 1, y: 0.7, z: 1 },
        targetPosition: { x: 0, y: 0, z: 0 }
    },
    {
        title: "ステップ 5: さらに折る",
        description: "もう一度、上と下の角を中心に折ります。",
        hint: "対称に折ることが重要です",
        animation: "foldAgain",
        targetRotation: { x: Math.PI / 5, y: 0, z: Math.PI / 4 + Math.PI / 8 },
        targetScale: { x: 1, y: 0.7, z: 0.6 },
        targetPosition: { x: 0, y: 0, z: 0 }
    },
    {
        title: "ステップ 6: 首と尾を作る",
        description: "中央の線で折り、片方を引き出して首と尾を作ります。",
        hint: "慎重に引き出して、形を整えます",
        animation: "createNeckTail",
        targetRotation: { x: Math.PI / 5, y: Math.PI / 3, z: Math.PI / 4 + Math.PI / 8 },
        targetScale: { x: 1, y: 0.7, z: 0.6 },
        targetPosition: { x: 0, y: 0, z: 0.5 }
    },
    {
        title: "ステップ 7: 翼を広げる",
        description: "両側から翼を広げます。軽く引き出すようにしましょう。",
        hint: "翼は対称に広がります",
        animation: "spreadWings",
        targetRotation: { x: Math.PI / 4, y: Math.PI / 3, z: Math.PI / 4 + Math.PI / 8 + Math.PI / 6 },
        targetScale: { x: 1, y: 0.7, z: 0.6 },
        targetPosition: { x: 0, y: 0, z: 0.5 }
    },
    {
        title: "ステップ 8: 足を作る",
        description: "下部から小さく折り出して足を作ります。両側に足を作ります。",
        hint: "小さく折り出すことがコツです",
        animation: "createLegs",
        targetRotation: { x: Math.PI / 8, y: Math.PI / 3, z: Math.PI / 4 + Math.PI / 8 + Math.PI / 6 },
        targetScale: { x: 1, y: 0.6, z: 0.6 },
        targetPosition: { x: 0, y: 0, z: 0.5 }
    },
    {
        title: "ステップ 9: 完成!",
        description: "全体を整えて、ツルが完成しました! 回転させてみましょう。",
        hint: "おめでとうございます! 美しいツルができました",
        animation: "complete",
        targetRotation: { x: Math.PI / 8, y: Math.PI, z: Math.PI / 4 + Math.PI / 8 + Math.PI / 6 },
        targetScale: { x: 1, y: 0.6, z: 0.6 },
        targetPosition: { x: 0, y: 0, z: 0.5 }
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
    const targetState = steps[currentStep];

    switch (animationType) {
        case 'initial':
            // 初期状態：回転のみ
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;

        case 'foldDiagonal':
        case 'foldToIsosceles':
        case 'foldToDiamond':
        case 'foldAgain':
        case 'createNeckTail':
        case 'spreadWings':
        case 'createLegs':
            // 各折り動作
            await animateFold(duration, targetState.targetRotation, targetState.targetScale, targetState.targetPosition);
            break;

        case 'complete':
            // 完成：ゆっくり回転
            await animateFold(2000, targetState.targetRotation, targetState.targetScale, targetState.targetPosition);
            break;
    }

    // アニメーション終了
    isAnimating = false;
}

async function animateFold(duration, targetRotation, targetScale, targetPosition) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        const startRotation = {
            x: paperGroup.rotation.x,
            y: paperGroup.rotation.y,
            z: paperGroup.rotation.z
        };
        const startScale = {
            x: paperGroup.scale.x,
            y: paperGroup.scale.y,
            z: paperGroup.scale.z
        };
        const startPosition = {
            x: paperGroup.position.x,
            y: paperGroup.position.y,
            z: paperGroup.position.z
        };

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // イーズイン・アウト
            const easeProgress = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            // 回転をアニメーション
            paperGroup.rotation.x = startRotation.x + (targetRotation.x - startRotation.x) * easeProgress;
            paperGroup.rotation.y = startRotation.y + (targetRotation.y - startRotation.y) * easeProgress;
            paperGroup.rotation.z = startRotation.z + (targetRotation.z - startRotation.z) * easeProgress;

            // スケールをアニメーション
            paperGroup.scale.x = startScale.x + (targetScale.x - startScale.x) * easeProgress;
            paperGroup.scale.y = startScale.y + (targetScale.y - startScale.y) * easeProgress;
            paperGroup.scale.z = startScale.z + (targetScale.z - startScale.z) * easeProgress;

            // 位置をアニメーション
            paperGroup.position.x = startPosition.x + (targetPosition.x - startPosition.x) * easeProgress;
            paperGroup.position.y = startPosition.y + (targetPosition.y - startPosition.y) * easeProgress;
            paperGroup.position.z = startPosition.z + (targetPosition.z - startPosition.z) * easeProgress;

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