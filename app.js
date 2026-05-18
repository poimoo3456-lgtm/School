import { db, auth, signInAnonymously } from './firebase.js';

import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.loginStudent = async () => {

  await signInAnonymously(auth);

  document.getElementById('loginPage').classList.add('hidden');

  document.getElementById('votePage').classList.remove('hidden');

  loadCandidates();
};

async function loadCandidates(){

  const container = document.getElementById('candidateContainer');

  container.innerHTML = '';

  const querySnapshot = await getDocs(collection(db, "schools/default/candidates"));

  querySnapshot.forEach((docSnap)=>{

    const data = docSnap.data();

    container.innerHTML += `

      <div class="glass rounded-3xl overflow-hidden">

        <img src="${data.image || 'https://placehold.co/600x400'}"
          class="w-full h-60 object-cover">

        <div class="p-5">

          <h3 class="text-2xl font-bold mb-2">
            ${data.name}
          </h3>

          <p class="mb-3">
            หมายเลข ${data.number}
          </p>

          <button
            onclick="vote('${docSnap.id}')"
            class="w-full bg-blue-500 p-3 rounded-xl">

            โหวต

          </button>

        </div>

      </div>
    `;
  });
}

window.vote = async (id) => {

  if(!confirm("ยืนยันการโหวต ?")) return;

  const ref = doc(db, "schools/default/candidates", id);

  await updateDoc(ref,{
    voteCount: increment(1)
  });

  alert("โหวตสำเร็จ");
};

window.openResults = () => {

  document.getElementById('resultPage').classList.remove('hidden');

  realtimeResults();
};

function realtimeResults(){

  onSnapshot(collection(db, "schools/default/candidates"),(snapshot)=>{

    const result = document.getElementById('resultContainer');

    result.innerHTML = '';

    snapshot.forEach((docSnap)=>{

      const data = docSnap.data();

      result.innerHTML += `

        <div class="glass p-5 rounded-2xl mb-4">

          <h3 class="text-xl font-bold">
            ${data.name}
          </h3>

          <p>
            คะแนน: ${data.voteCount || 0}
          </p>

        </div>

      `;
    });
  });
}

window.addCandidate = async () => {

  const name = document.getElementById('candidateName').value;

  const number = document.getElementById('candidateNumber').value;

  const policy = document.getElementById('candidatePolicy').value;

  await addDoc(collection(db, "schools/default/candidates"),{

    name,
    number,
    policy,
    voteCount:0,
    createdAt:Date.now()
  });

  alert("เพิ่มผู้สมัครแล้ว");
};

window.toggleVoting = ()=>{
  alert("Toggle Voting");
};

window.toggleResult = ()=>{
  alert("Toggle Result");
};

window.toggleMaintenance = ()=>{
  alert("Maintenance Mode");
};

window.resetSystem = ()=>{

  const step1 = confirm("ยืนยันรีเซ็ตระบบ ?");
  if(!step1) return;

  const step2 = confirm("ยืนยันอีกครั้ง ?");

  if(!step2) return;

  alert("รีเซ็ตระบบแล้ว");
};

const path = location.pathname;

if(path === "/admin"){

  const code = prompt("กรอกรหัส");

  if(code === "14150"){

    document.getElementById('adminPage')
      .classList.remove('hidden');

  }else if(code === "1669"){

    document.getElementById('ownerPage')
      .classList.remove('hidden');

  }else{

    alert("รหัสไม่ถูกต้อง");
  }
}
