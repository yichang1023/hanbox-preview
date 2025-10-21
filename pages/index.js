
從“react”導入{useEffect，useState}
導入'../styles/globals.css'

函數 downloadText(檔名，文字) {
  const blob = new Blob([text], { 類型：'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 檔案名稱;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

函數generateLesson（{級別，腳本，l1，長度，類型，主題，語法，角色}）{
  const intro = `【等級】${level}｜【字型】${script}｜【母語】${l1}｜【長度】約${length}字｜【類型】${type}｜【主題】${topic}`;
  const 提示=語法？ `\n【文法點】${grammar}` : "";
  if (type === '對話') {
    return `${intro}${tips}\n\n老師：今天我們要講「${topic}」。 \n學生A：老師，${topic}是什麼？ \n老師：用最簡單的方式說，${topic}就是…（${persona}用容易理解的例子來說明）。 \n學生B：可以舉例嗎？ \n老師：例如…（連結學生生活）。 \n學生A：那我可以怎麼用這個句型？ \n老師：試試看：『${topic}’${grammar ? `＋「${grammar}」` : '】'}造句。 \n學生B：好，我想試試看。 `;
  }
  return `${intro}${tips}\n\n${topic}和我們的生活有關。先理解關鍵字，然後在陷阱裡使用。 ${文法？ `本課聚焦文法：「${grammar}」。 ` : ''}\n接著，請閱讀下文並畫出重點：\n\n（論文）${topic}常在下列內容中出現…（以${level}級別抄本撰寫，${persona}的語氣）。 `;
}

函數 rewriteLesson({ 來源，級別，類型，長度，角色 }) {
  const trimmed = (source || '').trim();
  if (!trimmed) return '請貼上參考文字。 ';
  const prefix = `【改寫到${level}｜類型：${type}｜約${length}字｜語氣：${persona}】`;
  const simplified = trimmed.replace(/\s+/g, ' ').slice(0, Math.max(120, length));
  回傳 `${prefix}\n\n${simplified}${simplified.length < trimmed.length ? '……' : ''}`;
}

函數generateQuestions（{段落}）{
  const base = (passage || '').slice(0, 36).replace(/\n/g, ' ');
  返回 [
    `理解（記得）：請用自己的話解釋「${base}…」在說什麼。 `,
    `理解（Understand）：入門文中的三個關鍵字並解釋。 `,
    `應用程式（Apply）：用課文句型造一個與你生活相關的句子。 `,
    `分析（Analyze）：找出文中一個因果關係並說明。 `,
    `評估（Evaluate）：你同意文中的觀點嗎？為什麼？ `,
    `創造（Create）：以同一個主題，寫一段3句的新對話。 `,
  ].加入（'\n'）；
}

導出預設函數 Home() {
  const [persona, setPersona] = useState('溫暖耐心的AI助教（生活化例子、多示範）');
  const 人物角色 = [
    '溫暖耐心的AI助教（生活化例子、多示範）',
    '學術精準的語言學助教（定義清楚、有對比）',
    '課堂氣氛的互動（提問式引導）',
    '嚴謹條列的考試輔導（題型化、可評量）',
  ];

  const [gLevel, setGLevel] = useState('A1');
  const [gScript, setGScript] = useState('繁體中文');
  const [gL1, setGL1] = useState('中文');
  const [gLength，setGLength] = useState（200）;
  const [gType, setGType] = useState('對話');
  const [gTopic, setGTopic] = useState('颱風');
  const [gGrammar, setGGrammar] = useState('⋯是什麼？');
  const [gResult, setGResult] = useState('');

  const [rLevel, setRLevel] = useState('A1');
  const [rType, setRType] = useState('文章');
  const [rLength，setRLength] = useState（200）;
  const [rSource, setRSource] = useState('花蓮有颱風，大雨很多。水和泥沙流下來，房子、車子都壞了。很多人都害怕了。\n志願者拿著鏟子，幫忙清理家園。大家他們「鏟子超人」。志願者有學生、老師、爸爸媽媽，也有外地人。說「生」，大家慢慢來幹活。\n個居民很努力，他們說「花蓮」。
  const [rResult, setRResult] = useState('');

  const [qPassage, setQPassage] = useState('小明：天氣，今天的很不好。\n老師：對，今天有颱風。颱風來了，要小心。\n小明：颱風是什麼？\n老師：颱風就是很大的風和雨。\n哦小明：我們今天上課嗎？
  const [qResult, setQResult] = useState('');

  使用效果（（）=> {
    嘗試 {
      const saved = JSON.parse(localStorage.getItem('mvp-hanbox') || 'null');
      if (已儲存) setPersona(saved.persona || persona);
    } 抓住 {}
  }, []);
  使用效果（（）=> {
    localStorage.setItem('mvp-hanbox', JSON.stringify({ persona }));
  }, [角色]);

  返回 （
    <div className="min-h-screen">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-6xl py-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br 從藍色 500 到青色 400" />
            <div>
              <h1 className="text-2xl font-bold Tracking-tight">華語AI備課百寶箱</h1>
              <p className="text-sm text-slate-500">產生｜改寫｜出題｜分級｜可下載（MVP預覽版）</p>
            </div>
          </div>
          <span className="badge">MVP 預覽</span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">助教人格（Persona）</h3>
            </div>
            <label className="label">選擇助教風格</label>
            <select className="input" value={persona} onChange={e=>setPersona(e.target.value)}>
              {personas.map(p => <option key={p} value={p}>{p}</option>)}
            </選擇>
            <p className="mt-2 text-sm text-slate-600">人物設定會影響生成文字的語氣與範例風格。 </p>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">建立教材</h3>
              <span className="badge bg-blue-600 text-white">產生</span>
            </div>

            <div className="section">
              <h3>學生背景設定</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">等級（CEFR）</label>
                  <select className="input" value={gLevel} onChange={e=>setGLevel(e.target.value)}>
                    {['A1','A2','B1','B2','C1','C2'].map(lv => <option key={lv} value={lv}>{lv}</option>)}
                  </選擇>
                </div>
                <div>
                  <label className="label">目標字體／語種</label>
                  <select className="input" value={gScript} onChange={e=>setGScript(e.target.value)}>
                    <option value="繁體中文">繁體中文</option>
                    <選項值=「簡體中文」>簡體中文</選項>
                  </選擇>
                </div>
                <div>
                  <label className="label">學生母語</label>
                  <select className="input" value={gL1} onChange={e=>setGL1(e.target.value)}>
                    {['中文','日文','韓文','西文','越南文','泰文','其他'].map(x => <option key={x} value={x}>{x}</option>)}
                  </選擇>
                </div>
                <div>
                  <label className="label">字數上限（約）：{gLength}</label>
                  <input className="w-full" type="range" min="80" max="600" step="20" value={gLength} onChange={e=>setGLength(parseInt(e.target.value))} />
                </div>
              </div>
            </div>

            <div className="section">
              <h3>教材內容設定</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">教材類型</label>
                  <select className="input" value={gType} onChange={e=>setGType(e.target.value)}>
                    <選項值=“文章”>文章</選項>
                    <選項值=“對話”>對話</選項>
                  </選擇>
                </div>
                <div>
                  <label className="label">主題</label>
                  <input className="input" value={gTopic} onChange={e=>setGTopic(e.target.value)} placeholder="例如：颱風 / 在餐廳點餐" />
                </div>
              </div>
              <div className="mt-3">
                <label className="label">主要文法點（選填）</label>
                <input className="input" value={gGrammar} onChange={e=>setGGrammar(e.target.value)} placeholder="例如：…是什麼？、把字句、結果補語" />
              </div>
              <div className="pt-3 flex gap-2">
                <button className="btn btn-primary" onClick={() => setGResult(generateLesson({ level: gLevel, script: gScript, l1: gL1, length: gLength, type: gType, topic: gTopic, persmar: gGrammar, gLength, type: gType, topic: gTopic, persmar: gGrammar, pers>
                <button className="btn" onClick={() => { setGTopic('颱風'); setGType('對話'); setGGrammar('⋯是什麼？'); setGResult('小明：老師，今天的天氣很不好。\n老師：對，今天有颱風。颱風來了，要小心。\n小明：颱風是什麼？\n老師：颱風就是很大的風和雨。\n小明：哦，我明白了。我們今天還要上課嗎？
              </div>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">改寫教材</h3>
              <span className="badge bg-amber-600 text-white">改寫</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">目標等級</label>
                <select className="input" value={rLevel} onChange={e=>setRLevel(e.target.value)}>
                  {['A1','A2','B1','B2','C1','C2'].map(lv => <option key={lv} value={lv}>{lv}</option>)}
                </選擇>
              </div>
              <div>
                <label className="label">類型</label>
                <select className="input" value={rType} onChange={e=>setRType(e.target.value)}>
                  <選項值=“文章”>文章</選項>
                  <選項值=“對話”>對話</選項>
                </選擇>
              </div>
              <div>
                <label className="label">字數上限：{rLength}</label>
                <input className="w-full" type="range" min="80" max="600" step="20" value={rLength} onChange={e=>setRLength(parseInt(e.target.value))} />
              </div>
            </div>
            <div className="mt-3">
              <label className="label">貼上參考文字</label>
              <textarea 行={6} className="textarea" 值={rSource} onChange={e=>setRSource(e.target.value)} />
            </div>
            <div className="mt-2 flex gap-2">
              <button className="btn btn-primary" onClick={() => setRResult(rewriteLesson({ source: rSource, level: rLevel, type: rType, length: rLength, persona }))}>一鍵改寫</button>
              <button className="btn" onClick={() => setRSource('花蓮有颱風，大雨很多。水和泥沙流下來，房子、車子都壞了。很多人都害怕了。\n志願者有鏟子，幫忙清理家園。大家叫他們“鏟子超人”。志願者有學生、老師、爸爸媽媽，也有外地人。說“加油”，一起工作。\n個工作。載入範例</button>
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">從教材自動出題</h3>
              <span className="badge bg-emerald-600 text-white">出題</span>
            </div>
            <label className="label">貼入教材或對話</label>
            <textarea rows={5} className="textarea" value={qPassage} onChange={e=>setQPassage(e.target.value)} placeholder="貼上戲劇文或對話" />
            <div className="mt-2">
              <button className="btn btn-primary" onClick={() => setQResult(generateQuestions({passage: qPassage }))}>產生題目（Bloom六層）</button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">教材預覽 / 匯出</h3>
              <button className="btn" onClick={() => {
                const all = [gResult, rResult, qResult].filter(Boolean).join('\n\n---\n\n');
                如果（！全部）返回；
                downloadText(`教材匯出_${new Date().toISOString().slice(0,10)}.txt`, all);
              }}>下載全部</button>
            </div>
            <div className="網格間隙-4">
              <PreviewBlock title="生成教材" text={gResult} placeholder="（尚未生成，點左側「生成教材」）" />
              <PreviewBlock title="改寫結果" text={rResult} placeholder="（尚未改寫，點左邊「一鍵改寫」）" />
              <PreviewBlock title="出題結果" text={qResult} placeholder="（尚未出題，點左側「生成題目」）" />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">教學小工具</h3>
              <span className="badge">實驗性</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <HintCard title="詞彙覆蓋率（模擬）" content="A1:高頻詞80%｜A2:90%，僅示意圖用，正式版接NLP分析。" />
              <HintCard title="提醒語法（模擬）" content="使用『⋯是什麼？』時注意語序與量詞。" />
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold">下一步（正式版會增加）</h3>
            </div>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
              <li>串接LLM（FastAPI）以提供真實生成與語言學校正。 </li>
              <li>教材共享庫＋標籤搜尋（主題、等級、文法點）。 </li>
              <li>語音語音口語練習、自動回饋與錄音下載。 </li>
              <li>多模態：圖片導讀、對話模擬卡、角色卡扮演。 </li>
            </ul>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-xs text-slate-500">© {new Date().getFullYear()} 華語 AI 備課百寶箱 — 預覽版</footer>
    </div>
  ）
}

函數 PreviewBlock({ 標題，文本，佔位符 }) {
  const hasText = (text || '').trim().length > 0;
  返回 （
    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
      <div className="mb-2 font-medium">{title} </div>
      <div className={hasText ? '空白預換行 leading-7 文字-sm' : '空白預換行 leading-7 文字-sm 斜體文字-slate-400'}>
        {hasText？文字：佔位符}
      </div>
    </div>
  ）
}

函數 HintCard（{ 標題， 內容 }）{
  返回 （
    <div className="rounded-xl border border-slate-200 p-4 bg-slate-50">
      <div className="font-medium mb-1">{title} </div>
      <div className="text-sm text-slate-700">{內容} </div>
    </div>
  ）
}
