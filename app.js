const products = [
  {
    id: 1,
    category: "手すり",
    name: "玄関・上がりかまち用手すり",
    icon: "🪜",
    description: "玄関の段差や上がりかまちで、立ち上がりと昇降を支える手すりです。",
    recommend: "玄関の段差でふらつく方、靴の脱ぎ履きで立位が不安定な方。"
  },
  {
    id: 2,
    category: "手すり",
    name: "ベッドサイド用手すり",
    icon: "🛏️",
    description: "ベッドからの起き上がりや立ち上がりを支える手すりです。",
    recommend: "夜間の起き上がりや、ベッドからの移乗が不安な方。"
  },
  {
    id: 3,
    category: "手すり",
    name: "廊下・トイレ用据え置き手すり",
    icon: "🚶",
    description: "廊下やトイレなど、つかまる場所が必要なところに設置するタイプです。",
    recommend: "壁に手すりを取り付けにくい場所で、つかまる場所が欲しい方。"
  },
  {
    id: 4,
    category: "ベッド",
    name: "電動介護用ベッド",
    icon: "🛌",
    description: "背上げ・高さ調整などで、起き上がりや移乗をサポートするベッドです。",
    recommend: "起き上がりや立ち上がりに介助が必要な方。"
  },
  {
    id: 5,
    category: "ベッド",
    name: "ベッド用サイドレール",
    icon: "▥",
    description: "ベッド上での姿勢保持や、寝具のずれを防ぐために使う用品です。",
    recommend: "ベッド上での姿勢が崩れやすい方。使用目的を確認して選びます。"
  },
  {
    id: 6,
    category: "車いす",
    name: "自走式車いす",
    icon: "♿",
    description: "手で車輪を操作して、自分で移動することを想定した車いすです。",
    recommend: "腕の力や操作能力があり、自分で移動したい方。"
  },
  {
    id: 7,
    category: "車いす",
    name: "介助用車いす",
    icon: "🧑‍🦽",
    description: "介助者が後ろから押して移動するタイプの車いすです。",
    recommend: "外出や通院時に、介助者による移動が中心となる方。"
  },
  {
    id: 8,
    category: "マットレス",
    name: "体圧分散マットレス",
    icon: "🛏️",
    description: "身体にかかる圧力を分散し、ベッド上での負担軽減を考えるマットレスです。",
    recommend: "長時間ベッドで過ごす方や、寝返りが少ない方。"
  },
  {
    id: 9,
    category: "マットレス",
    name: "エアマットレス",
    icon: "〰️",
    description: "空気の力で身体への圧力を分散するタイプのマットレスです。",
    recommend: "自力での寝返りが難しい方や、体圧分散を検討する方。"
  }
];

const grid = document.getElementById("productGrid");
const count = document.getElementById("count");
let currentCategory = "すべて";

function render() {
  const query = document
    .getElementById("search")
    .value
    .trim()
    .toLowerCase();

  const list = products.filter(product => {
    const categoryMatch =
      currentCategory === "すべて" ||
      product.category === currentCategory;

    const textMatch =
      !query ||
      [
        product.name,
        product.category,
        product.description,
        product.recommend
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

    return categoryMatch && textMatch;
  });

  count.textContent = `${list.length}件`;

  grid.innerHTML =
    list
      .map(
        product => `
          <article class="product" data-id="${product.id}">
            <div class="product-icon">${product.icon}</div>
            <span class="pill">${product.category}</span>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </article>
        `
      )
      .join("") || "<p>該当する商品がありません。</p>";

  grid.querySelectorAll(".product").forEach(element => {
    element.addEventListener("click", () => {
      openModal(Number(element.dataset.id));
    });
  });
}

function openModal(id) {
  const product = products.find(item => item.id === id);

  document.getElementById("modalIcon").textContent = product.icon;
  document.getElementById("modalCategory").textContent = product.category;
  document.getElementById("modalName").textContent = product.name;
  document.getElementById("modalDescription").textContent =
    product.description;
  document.getElementById("modalRecommend").textContent =
    product.recommend;

  document.getElementById("modal").classList.add("open");
  document.getElementById("modal").setAttribute("aria-hidden", "false");
}

function closeModal() {
  document.getElementById("modal").classList.remove("open");
  document.getElementById("modal").setAttribute("aria-hidden", "true");
}

document.getElementById("search").addEventListener("input", render);

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".category")
      .forEach(item => item.classList.remove("active"));

    button.classList.add("active");
    currentCategory = button.dataset.category;
    render();
  });
});

document.getElementById("closeModal").addEventListener("click", closeModal);
document
  .getElementById("modalBackdrop")
  .addEventListener("click", closeModal);

document
  .getElementById("contactButton")
  .addEventListener("click", () => {
    alert("お問い合わせ機能は次のステップで追加します。");
  });

render();
