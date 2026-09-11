const products=[
 {id:1,category:"手すり",name:"玄関用手すり",icon:"🪜",description:"玄関の上り下りを安全にサポートする手すりです。",recommend:"玄関での立ち上がりや段差の昇降に不安がある方。"},
 {id:2,category:"手すり",name:"ベッドサイド手すり",icon:"🛏️",description:"ベッドからの立ち上がりを支えるサポート用品です。",recommend:"夜間の起き上がりやベッドからの移乗が不安な方。"},
 {id:3,category:"ベッド",name:"介護用ベッド",icon:"🛌",description:"高さ調整などで起き上がりや移乗をサポートします。",recommend:"起き上がり・立ち上がりに介助が必要な方。"},
 {id:4,category:"車いす",name:"自走式車いす",icon:"♿",description:"外出や施設内の移動をサポートする車いすです。",recommend:"自分で車いすを操作でき、移動範囲を広げたい方。"},
 {id:5,category:"マットレス",name:"体圧分散マットレス",icon:"🛏️",description:"寝ている間の身体への負担をやわらげるマットレスです。",recommend:"長時間ベッドで過ごす方や、体圧分散を考えたい方。"},
 {id:6,category:"車いす",name:"介助用車いす",icon:"🧑‍🦽",description:"介助者が押して移動するタイプの車いすです。",recommend:"外出時などに介助者による移動が中心の方。"}
];

const grid=document.getElementById("productGrid");
const count=document.getElementById("count");
let currentCategory="すべて";

function render(){
 const q=document.getElementById("search").value.trim().toLowerCase();
 const list=products.filter(p=>(currentCategory==="すべて"||p.category===currentCategory)&&(!q||[p.name,p.category,p.description,p.recommend].join(" ").toLowerCase().includes(q)));
 count.textContent=`${list.length}件`;
 grid.innerHTML=list.map(p=>`<article class="product" data-id="${p.id}">
   <div class="product-icon">${p.icon}</div>
   <span class="pill">${p.category}</span>
   <h3>${p.name}</h3>
   <p>${p.description}</p>
 </article>`).join("")||"<p>該当する商品がありません。</p>";
 grid.querySelectorAll(".product").forEach(el=>el.addEventListener("click",()=>openModal(Number(el.dataset.id))));
}
function openModal(id){
 const p=products.find(x=>x.id===id);
 document.getElementById("modalIcon").textContent=p.icon;
 document.getElementById("modalCategory").textContent=p.category;
 document.getElementById("modalName").textContent=p.name;
 document.getElementById("modalDescription").textContent=p.description;
 document.getElementById("modalRecommend").textContent=p.recommend;
 document.getElementById("modal").classList.add("open");
 document.getElementById("modal").setAttribute("aria-hidden","false");
}
function closeModal(){
 document.getElementById("modal").classList.remove("open");
 document.getElementById("modal").setAttribute("aria-hidden","true");
}
document.getElementById("search").addEventListener("input",render);
document.querySelectorAll(".category").forEach(btn=>btn.addEventListener("click",()=>{
 document.querySelectorAll(".category").forEach(b=>b.classList.remove("active"));
 btn.classList.add("active");
 currentCategory=btn.dataset.category;
 render();
}));
document.getElementById("closeModal").addEventListener("click",closeModal);
document.getElementById("modalBackdrop").addEventListener("click",closeModal);
document.getElementById("contactButton").addEventListener("click",()=>alert("お問い合わせ機能は次のステップで追加します。"));
render();
