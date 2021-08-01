const glob = require('glob');

// EventEmitter와 Callback이 복합적으로 적용된 라이브러리
glob('*.txt', (err, files) => {
    if (err) {
        return console.error(err);
    }
    // 완료 후 콜백 (1회만 작동)
    console.log(`All files found: ${JSON.stringify(files)}`);
})
// 매치에 대한 실시간 알림 (이벤트 시 매번 작동)
.on('match', match => console.log(`Match found: ${match}`));