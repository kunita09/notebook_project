const bwipjs = require('bwip-js');
const fs = require('fs');

// สร้างบาร์โค้ดทดสอบ
bwipjs.toBuffer({
    bcid: 'code128',       // ชนิดของบาร์โค้ด
    text: '123456789012',  // ข้อความบาร์โค้ด
    scale: 3,              // ขนาด
    height: 10,            // ความสูง
    includetext: true,
    textxalign: 'center',
}, function (err, png) {
    if (err) {
        console.error('Error generating barcode:', err);
    } else {
        // บันทึกบาร์โค้ดเป็นไฟล์รูปภาพ
        fs.writeFileSync('barcode.png', png);
        console.log('Barcode image generated and saved as barcode.png');
    }
});
