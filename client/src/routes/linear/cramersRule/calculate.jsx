import { det } from "mathjs";

const calculate = (n, matA, matB) => {
    // แปลงค่าเป็นตัวเลขก่อนการคำนวณ
    const matrixA = matA.map((row) => row.map((val) => parseFloat(val) || 0));
    const matrixB = matB.map((val) => parseFloat(val) || 0);

    // คำนวณ detA
    const detA = det(matrixA);
    if (detA === 0) {
      return;
    }

    // คำนวณดีเทอร์มิแนนต์ของ Ai
    const Ans = [];
    const detAi = [];
    for (let i = 0; i < n; i++) {
      const ai2D = matrixA.map((row) => [...row]); // คัดลอกเมทริกซ์ A

      for (let j = 0; j < n; j++) {
        ai2D[j][i] = matrixB[j]; // แทนที่คอลัมน์ i ด้วยเมทริกซ์ B
      }

      const detAi_val = det(ai2D)
      detAi.push(detAi_val);
      Ans.push(detAi_val / detA);
    }

    return {
      X: Ans,
      detA: detA,
      detAi: detAi,
    };
}

export {
    calculate
}