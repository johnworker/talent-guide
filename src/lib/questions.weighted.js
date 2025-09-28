// 題組（sections） → 每組 2~3 題做情境切換
// 每個選項有 roleWeights（加權地圖），可多選（multi: true）
export const WEIGHTED_SECTIONS = [
  {
    id: 'collab',
    title: '協作情境',
    questions: [
      {
        id: 'c1',
        text: '當專案遇到卡關時，你最直覺的做法是？（可多選）',
        multi: true,
        options: [
          { label: '先安撫情緒，整理溝通', roleWeights: { supporter: 1.0, matchmaker: 0.4 } },
          { label: '盤點資源與風險，再排優先順序', roleWeights: { accumulator: 1.0, landlord: 0.3 } },
          { label: '拆解技術問題，做可行性驗證', roleWeights: { technician: 1.0, creator: 0.2 } },
          { label: '打開銷售/合作機會換條件', roleWeights: { merchant: 1.0, star: 0.3 } },
        ],
      },
      {
        id: 'c2',
        text: '團隊內部對齊，你通常擔任：',
        multi: false,
        options: [
          { label: '主持人/帶氣氛', roleWeights: { star: 1.0, supporter: 0.4 } },
          { label: '紀錄/整理產出', roleWeights: { accumulator: 1.0, creator: 0.4 } },
          { label: '技術把關/品質', roleWeights: { technician: 1.0 } },
          { label: '資源橋接/牽線', roleWeights: { matchmaker: 1.0, merchant: 0.4 } },
        ],
      },
    ],
  },
  {
    id: 'delivery',
    title: '交付與產出',
    questions: [
      {
        id: 'd1',
        text: '你最享受的工作型態是？（可多選）',
        multi: true,
        options: [
          { label: '寫作/設計/產出作品', roleWeights: { creator: 1.0, star: 0.2 } },
          { label: '流程/系統化與追蹤', roleWeights: { accumulator: 1.0, landlord: 0.3 } },
          { label: '維運/修復與最佳化', roleWeights: { technician: 1.0 } },
          { label: '銷售/商談/定價', roleWeights: { merchant: 1.0, matchmaker: 0.3 } },
        ],
      },
      {
        id: 'd2',
        text: '若要把成果擴散出去，你會偏向：',
        multi: false,
        options: [
          { label: '登台分享/短影音曝光', roleWeights: { star: 1.0 } },
          { label: '社群經營/客服口碑', roleWeights: { supporter: 1.0 } },
          { label: '佈局通路/異業合作', roleWeights: { matchmaker: 1.0, merchant: 0.5 } },
          { label: '打造平台/規模化資產', roleWeights: { landlord: 1.0 } },
        ],
      },
    ],
  },
  {
    id: 'values',
    title: '價值取向',
    questions: [
      {
        id: 'v1',
        text: '你認為對你最重要的價值是？（可多選）',
        multi: true,
        options: [
          { label: '可靠與穩定', roleWeights: { technician: 0.8, landlord: 0.6 } },
          { label: '影響與曝光', roleWeights: { star: 0.8, creator: 0.4 } },
          { label: '關係與信任', roleWeights: { supporter: 0.8, matchmaker: 0.6 } },
          { label: '成長與商業成果', roleWeights: { merchant: 0.8, accumulator: 0.6 } },
        ],
      },
    ],
  },
]

// 便於 Recommend.vue 估算總題數
export const TOTAL_QUESTIONS = WEIGHTED_SECTIONS.reduce((n, s) => n + s.questions.length, 0)
