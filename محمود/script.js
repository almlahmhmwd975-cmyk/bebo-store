// 1. رقم الواتساب الخاص بالزبون (صاحبة المتجر)
// يرجى كتابته كاملاً بترميز الدولة وبدون أصفار في البداية أو علامة +
const whatsappNumber = "201000000000"; // قم بتعديل هذا الرقم لاحقاً للرقم الفعلي للزبون

// 2. دالة جلب المنتجات المرفوعة من لوحة تحكم الـ Decap CMS
async function loadStoreProducts() {
    try {
        // عينات تجريبية بنفس الهيكل البرمجي المرفوع لتجربة التصميم محلياً ورؤية النتيجة فوراً
        const localProductsMock = [
            { title: "عطر لافي الفاخر", price: 2400, category: "عطور", description: "بتركيبة ملكية مركزة تدوم طويلاً مع نفحات العود والصندل الفخم.", image: "https://unsplash.com" },
            { title: "ساعة رويال كرونوغراف", price: 5800, category: "ساعات", description: "ساعة كلاسيكية سوداء مقاومة للماء بتصميم عصري وأنيق.", image: "https://unsplash.com" },
            { title: "عقد التاج الذهبي", price: 1950, category: "إكسسوارات", description: "مصنوع بعناية ومطلي بذهب عيار 21 ليمنحك بريقاً مذهلاً وخاصاً.", image: "https://unsplash.com" }
        ];

        // تشغيل التوزيع التلقائي للمنتجات داخل الموقع
        renderProductsToGrid(localProductsMock);

    } catch (error) {
        console.error("حدث خطأ أثناء جلب المنتجات:", error);
    }
}

// 3. دالة بناء كروت المنتجات وتوزيعها في الأقسام السينمائية الثلاثة
function renderProductsToGrid(productsList) {
    const perfumesContainer = document.getElementById('perfumes-container');
    const watchesContainer = document.getElementById('watches-container');
    const accessoriesContainer = document.getElementById('accessories-container');

    // تصفير الحاويات تماماً قبل التوليد لضمان عدم التكرار
    if(perfumesContainer) perfumesContainer.innerHTML = '';
    if(watchesContainer) watchesContainer.innerHTML = '';
    if(accessoriesContainer) accessoriesContainer.innerHTML = '';

    productsList.forEach(product => {
        // تجهيز وتشفير رسالة الواتساب الأوتوماتيكية بناءً على تفاصيل كل منتج
        const messageText = `مرحباً متجر BEBO، أريد طلب قطعة من:\n\n- المنتج: ${product.title}\n- القسم: ${product.category}\n- السعر: ${product.price} ج.م\n\nهل هذا المنتج متوفر الآن؟`;
        const encodedMessage = encodeURIComponent(messageText);
        const whatsappFullURL = `https://wa.me{whatsappNumber}?text=${encodedMessage}`;

        // الهيكل البرمجي لكارت المنتج الفاخر
        const productCardHTML = `
            <div class="product-card-luxury">
                <div class="img-container">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="card-footer">
                        <span class="price-luxury">${product.price} ج.م</span>
                        <button class="btn-whatsapp-order" onclick="window.open('${whatsappFullURL}', '_blank')">
                            اطلب عبر واتساب
                        </button>
                    </div>
                </div>
            </div>
        `;

        // التوزيع التلقائي في القسم الصحيح المطابق لخيار لوحة التحكم
        if (product.category === "عطور" && perfumesContainer) {
            perfumesContainer.innerHTML += productCardHTML;
        } else if (product.category === "ساعات" && watchesContainer) {
            watchesContainer.innerHTML += productCardHTML;
        } else if (product.category === "إكسسوارات" && accessoriesContainer) {
            accessoriesContainer.innerHTML += productCardHTML;
        }
    });
}

// 4. إطلاق الجلب التلقائي فور فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    loadStoreProducts();
});
// كود تحريك الكلمات الترحيبية في قسم الهيرو لمتجر BEBO
const words = ["عطور", "ساعات", "فخامة"];
let wordIndex = 0;
const textSpan = document.querySelector(".changing-text");

function changeWord() {
    if(textSpan) {
        textSpan.style.opacity = 0; // إخفاء الكلمة الحالية بنعومة
        setTimeout(() => {
            wordIndex = (wordIndex + 1) % words.length;
            textSpan.textContent = words[wordIndex]; // تبديل الكلمة
            textSpan.style.opacity = 1; // إظهار الكلمة الجديدة
        }, 400); // وقت التلاشي بالملي ثانية
    }
}

setInterval(changeWord, 2000); // تبديل الكلمة كل ثانيتين تلقائياً
// كود تشغيل زر الصعود للأعلى لمتجر BEBO
const backTopBtn = document.getElementById("backToTop");

window.addEventListener('scroll', function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        if(backTopBtn) backTopBtn.style.display = "flex";
    } else {
        if(backTopBtn) backTopBtn.style.display = "none";
    }
});

if(backTopBtn) {
    backTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}
// مصفوفة لتخزين عناصر السلة
let cart = [];
const WHATSAPP_NUMBER = "2010XXXXXXXX"; // ضع هنا رقم واتساب العميل بصيغة دولية بدون أصفار

// فتح وإغلاق السلة
function toggleCart() {
    document.getElementById('side-cart').classList.toggle('open');
}

// إضافة منتج للسلة (AJAX)
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    updateCartUI();
}

// تحديث واجهة السلة
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotalVal = document.getElementById('cart-total-val');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">السلة فارغة حالياً.</p>';
        cartCount.innerText = '0';
        cartTotalVal.innerText = '0';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;
    
    cart.forEach(item => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        
        cartItemsContainer.innerHTML += `
            <div class="cart-item" style="display:flex; justify-content:space-between; margin-bottom:15px; border-bottom:1px solid #222; padding-bottom:5px;">
                <div>
                    <h4>${item.name}</h4>
                    <small>${item.price} ج.م × ${item.quantity}</small>
                </div>
                <button onclick="removeFromCart('${item.id}')" style="background:none; border:none; color:red; cursor:pointer;">إزالة</button>
            </div>
        `;
    });
    
    cartCount.innerText = totalItems;
    cartTotalVal.innerText = total;
}

// إزالة منتج من السلة
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// إرسال الطلب بالكامل إلى واتساب العميل
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert('سلتك فارغة!');
        return;
    }
    
    let message = ` مرحبا متجر BEBO، أود طلب المنتجات التالية:\n\n`;
    let total = 0;
    
    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}* (الكمية: ${item.quantity}) - السعر: ${item.price * item.quantity} ج.م\n`;
        total += item.price * item.quantity;
    });
    
    message += `\n*الإجمالي الكلي:* ${total} ج.م`;
    
    // ترميز الرسالة لرابط الويب
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me{WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    // فتح المحادثة
    window.open(whatsappURL, '_blank');
}
// كود مراقبة المنتجات وإظهارها عند التمرير للأسفل
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // إضافة الكلاس لتفعيل أنيميشن الـ CSS
        }
    });
}, {
    threshold: 0.1 // يبدأ التأثير بمجرد ظهور 10% من بطاقة المنتج على الشاشة
});

// تطبيق المراقبة على جميع بطاقات المنتجات
document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
});
// كود جافاسكريبت لإرسال الطلب إلى الواتساب
function sendOrderToWhatsApp(productName, productPrice, customerName, customerPhone) {
    // رقم واتساب صاحب المتجر (اكتبه بالصيغة الدولية بدون أصفار أو علامة +)
    const storePhoneNumber = "201000000000"; 

    // نص الرسالة التلقائية التي ستصل لصاحب المتجر
    const message = `طلب جديد من متجر BEBO ✨🛍️\n\n` +
                    `👤 اسم العميل: ${customerName}\n` +
                    `📞 رقم هاتف العميل: ${customerPhone}\n` +
                    `📦 المنتج: ${productName}\n` +
                    `💰 السعر: ${productPrice} جنيه\n\n` +
                    `يرجى تأكيد الطلب وتحديد موعد الشحن.`;

    // ترميز النص ليكون متوافقاً مع الروابط (URL Encoding)
    const encodedMessage = encodeURIComponent(message);

    // إنشاء رابط الواتساب الديناميكي
    const whatsappUrl = `https://wa.me{storePhoneNumber}?text=${encodedMessage}`;

    // فتح الرابط في نافذة جديدة لإرسال الرسالة
    window.open(whatsappUrl, '_blank');
}

// مثال على تشغيل الدالة عند ضغط الزبون على زر التأكيد
// sendOrderToWhatsApp("عطر سكرت فانيلا", "750", "محمود محمد", "0123456789");
// قائمة الكوبونات المتاحة ونسبة الخصم الخاصة بها
const availableCoupons = {
    "BEBO10": 0.10,  // خصم 10%
    "EID2026": 0.20, // خصم 20%
    "SAVE15": 0.15   // خصم 15%
};

function applyDiscount(couponCode, originalPrice) {
    // تحويل الكود إلى حروف كبيرة لتفادي الأخطاء
    const formattedCode = couponCode.trim().toUpperCase();

    // التحقق من وجود الكوبون
    if (availableCoupons.hasOwnProperty(formattedCode)) {
        const discountRate = availableCoupons[formattedCode];
        const discountAmount = originalPrice * discountRate;
        const finalPrice = originalPrice - discountAmount;

        return {
            success: true,
            message: `تم تطبيق الخصم بنجاح! نسبة الخصم: ${discountRate * 100}%`,
            discountAmount: discountAmount,
            finalPrice: finalPrice
        };
    } else {
        return {
            success: false,
            message: "عذراً، هذا الكوبون غير صحيح أو منتهي الصلاحية.",
            discountAmount: 0,
            finalPrice: originalPrice
        };
    }
}

// مثال للاستخدام:
// console.log(applyDiscount("BEBO10", 1000)); 
// النتيجة: السعر النهائي 900 جنيه وقيمة الخصم 100 جنيه
// دالة لتنظيف النصوص وحذف أي وسم HTML خبيث قد يحقنه المخترق
function sanitizeInput(inputText) {
    if (typeof inputText !== 'string') return inputText;
    
    // استبدال الرموز الخاصة بأكواد نصية آمنة لمنع تشغيلها كـ كود برمي
    return inputText
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#x27;")
        .replace(/\//g, "&#x2F;");
}

// مثال لحماية الباك إند:
// const unsafeName = "<script>alert('hacked')</script>محمود";
// const safeName = sanitizeInput(unsafeName);
// console.log(safeName); 
// النتيجة: &lt;script&gt;alert('hacked')&lt;/script&gt;محمود (نص آمن تماماً لا يمكنه اختراق الموقع)
// دالة لجمع محتويات السلة وإرسالها كاملة في رسالة واحدة إلى الواتساب
function sendFullCartToWhatsApp(customerName, customerPhone) {
    // 1. رقم واتساب صاحب المتجر (اكتبه بالصيغة الدولية بدون أصفار أو علامة +)
    const storePhoneNumber = "201000000000"; 

    // 2. جلب سلة المشتريات المخزنة في المتصفح
    const cart = JSON.parse(localStorage.getItem('bebo_cart')) || [];

    if (cart.length === 0) {
        alert("سلة المشتريات فارغة حالياً! 🛒");
        return;
    }

    // 3. بناء نص المنتجات ديناميكياً من داخل السلة
    let itemsList = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        // إضافة تفاصيل كل منتج (الاسم، الكمية، وسعر القطعة)
        itemsList += `${index + 1}. 📦 *${item.name}*\n` +
                     `   الكمية: ${item.quantity} | السعر: ${item.price} ج.م\n` +
                     `   الإجمالي الفرعي: ${itemTotal} ج.م\n-----------------------\n`;
    });

    // 4. صياغة الرسالة النهائية بشكل فاخر ومنظم يناسب متجر BEBO
    const finalMessage = `طلب جديد من متجر BEBO ✨🛍️\n\n` +
                         `👤 *بيانات العميل:*\n` +
                         `• الاسم: ${customerName}\n` +
                         `• الهاتف: ${customerPhone}\n\n` +
                         `🛒 *تفاصيل الطلبية:*\n` +
                         `${itemsList}\n` +
                         `💰 *الحساب الإجمالي النهائي:* ${totalPrice} ج.م\n\n` +
                         `يرجى تأكيد الطلب وتجهيز الشحن للعميل.`;

    // 5. ترميز الرسالة لفتح الرابط بشكل آمن (URL Encoding)
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me{storePhoneNumber}?text=${encodedMessage}`;

    // 6. فتح محادثة الواتساب
    window.open(whatsappUrl, '_blank');
}

// مثال لتشغيل الدالة عند الضغط على "تأكيد الطلب" في صفحة السلة:
// sendFullCartToWhatsApp("محمود أحمد", "01012345678");
// قائمة بأسعار الشحن للمحافظات
const shippingRates = {
    "cairo": 50,      // القاهرة
    "giza": 50,       // الجيزة
    "alex": 60,       // الإسكندرية
    "dakahlia": 45,   // الدقهلية (مثل ميت غمر)
    "others": 75      // باقي المحافظات
};

function updateOrderSummary(selectedGovernorate, cartTotal) {
    // تحديد تكلفة الشحن بناءً على الاختيار أو وضع السعر الافتراضي للمحافظات الأخرى
    const shippingCost = shippingRates[selectedGovernorate] || shippingRates["others"];
    const finalTotal = cartTotal + shippingCost;

    return {
        shipping: shippingCost,
        total: finalTotal
    };
}

// مثال للاستخدام عند تغيير القائمة المنسدلة (Dropdown) في صفحة الدفع:
// console.log(updateOrderSummary("dakahlia", 1500)); 
// النتيجة: الشحن 45 ج.م، الإجمالي 1545 ج.م
// تحديد تاريخ انتهاء العرض (مثال: نهاية الشهر الحالي)
const countDownDate = new Date("Sep 30, 2026 23:59:59").getTime();

// تحديث العداد كل ثانية واحدة
const timerInterval = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // حساب الوقت بالأيام، الساعات، الدقائق، والثواني
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // عرض النتيجة في عناصر الـ HTML الخاصة بمتجرك
    document.getElementById("countdown-days").innerHTML = days + " يوم ";
    document.getElementById("countdown-hours").innerHTML = hours + " ساعة ";
    document.getElementById("countdown-minutes").innerHTML = minutes + " دقيقة ";
    document.getElementById("countdown-seconds").innerHTML = seconds + " ثانية ";

    // إذا انتهى الوقت، قم بإيقاف المؤقت وكتابة نص بديل
    if (distance < 0) {
        clearInterval(timerInterval);
        document.getElementById("countdown-box").innerHTML = "عفواً، انتهى هذا العرض الحصري! 💥";
    }
}, 1000);
function validateEgyptianNumber(phoneNumber) {
    // التعبير النمطي (Regex) للتأكد من أن الرقم يبدأ بـ 01 ويحتوي على 11 رقماً تفصيلياً
    const egyptPhoneRegex = /^01[0125][0-9]{8}$/;

    const cleanNumber = phoneNumber.trim();

    if (egyptPhoneRegex.test(cleanNumber)) {
        return {
            isValid: true,
            message: "رقم الهاتف صحيح ومطابق للشبكات المصرية! ✅"
        };
    } else {
        return {
            isValid: false,
            message: "برجاء إدخال رقم موبايل مصري صحيح مكون من 11 رقماً (مثال: 010XXXXXXXX). ❌"
        };
    }
}

// مثال للاستخدام قبل تشغيل دالة الواتساب:
// const check = validateEgyptianNumber("01012345678");
// if(!check.isValid) { alert(check.message); }
// إنتاج مراقب ذكي لعناصر الصفحة
const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        // إذا ظهر الكارت على الشاشة بنسبة معينة، أضف كلاس الظهور
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // إيقاف المراقبة بعد الظهور لتوفير أداء الجهاز
        }
    });
}, {
    threshold: 0.15 // يبدأ التأثير عندما يظهر 15% من الكارت على الشاشة
});

// تشغيل المراقب على جميع كروت المنتجات في المتجر فور تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => scrollObserver.observe(card));
});
// دالة رئيسية لتحديث الأرقام في واجهة المستخدم (UI)
function updateUIElements(subTotal, discountAmount, shippingCost) {
    // حساب الإجمالي النهائي
    const finalTotal = (subTotal - discountAmount) + shippingCost;

    // تحديث النصوص داخل عناصر HTML الحالية في موقعك
    // (تأكد من مطابقة الـ id مع العناصر الموجودة في ملف الـ HTML لديك)
    
    // 1. تحديث المجموع الفرعي للمنتجات
    document.getElementById("ui-subtotal").innerText = `${subTotal} ج.م`;
    
    // 2. تحديث قيمة الخصم (إذا تم تطبيق كوبون)
    document.getElementById("ui-discount").innerText = `-${discountAmount} ج.م`;
    
    // 3. تحديث مصاريف الشحن بناءً على المحافظة
    document.getElementById("ui-shipping").innerText = `+${shippingCost} ج.م`;
    
    // 4. تحديث الرقم النهائي المطلوب دفعه
    document.getElementById("ui-final-total").innerText = `${finalTotal} ج.م`;
}
// [أولاً] عند تغيير المحافظة في القائمة المنسدلة (Dropdown)
document.getElementById("governorate-select").addEventListener("change", function() {
    const selectedGov = this.value;
    
    // 1. استدعاء دالة الشحن المنفصلة الخاصة بك لجلب التكلفة الجديدة
    const newShippingCost = getShippingCost(selectedGov); 
    
    // 2. جلب القيم الحالية للحسابات
    const currentSubtotal = calculateCartTotal(); // دالة السلة الخاصة بك
    const currentDiscount = getCurrentDiscount(); // دالة الكوبون الخاصة بك
    
    // 3. تحديث الـ UI فوراً بالقيم الجديدة
    updateUIElements(currentSubtotal, currentDiscount, newShippingCost);
});


// [ثانياً] عند الضغط على زر "تطبيق الكوبون"
document.getElementById("apply-coupon-btn").addEventListener("click", function() {
    const couponCode = document.getElementById("coupon-input").value;
    const currentSubtotal = calculateCartTotal();
    
    // 1. استدعاء دالة الكوبونات المنفصلة الخاصة بك لحساب الخصم الجديد
    const newDiscount = checkCouponDiscount(couponCode, currentSubtotal); 
    
    // 2. جلب قيمة الشحن الحالية
    const selectedGov = document.getElementById("governorate-select").value;
    const currentShipping = getShippingCost(selectedGov);
    
    // 3. تحديث الـ UI فوراً بالقيم الجديدة
    updateUIElements(currentSubtotal, newDiscount, currentShipping);
});
// دالة لتحديث كمية منتج معين داخل السلة وإعادة حساب الـ UI
function updateItemQuantity(productId, newQuantity) {
    // 1. جلب السلة الحالية
    let cart = JSON.parse(localStorage.getItem('bebo_cart')) || [];
    
    // 2. البحث عن المنتج وتحديث كميته
    const product = cart.find(item => item.id === productId);
    if (product && newQuantity > 0) {
        product.quantity = parseInt(newQuantity);
    }
    
    // 3. حفظ التعديل في متصفح الزبون
    localStorage.setItem('bebo_cart', JSON.stringify(cart));
    
    // 4. تحديث سعر السطر الخاص بهذا المنتج في الواجهة (HTML)
    const itemTotalElement = document.getElementById(`total-price-${productId}`);
    if (itemTotalElement) {
        itemTotalElement.innerText = `${product.price * product.quantity} ج.م`;
    }
    
    // 5. استدعاء دالة تحديث الإجمالي الكلي للموقع التي قمنا بكتابتها سابقاً
    refreshAllTotals(); 
}

// مثال لربطه بحقل الكمية في الـ HTML:
// <input type="number" value="1" min="1" onchange="updateItemQuantity('perfume-01', this.value)">
// دالة لحذف منتج تماماً من سلة المشتريات
function removeItemFromCart(productId) {
    // 1. جلب السلة الحالية من المتصفح
    let cart = JSON.parse(localStorage.getItem('bebo_cart')) || [];

    // 2. فلترة المصفوفة لحذف المنتج المطلوب (إبقاء المنتجات التي لا تطابق هذا الـ ID)
    cart = cart.filter(item => item.id !== productId);

    // 3. حفظ السلة الجديدة والمحدثة في المتصفح
    localStorage.setItem('bebo_cart', JSON.stringify(cart));

    // 4. حذف عنصر الـ HTML (الكارت أو السطر الخاص بالمنتج) من الشاشة مباشرة بنعومة
    const productRow = document.getElementById(`cart-item-${productId}`);
    if (productRow) {
        // إضافة أنيميشن اختفاء قبل الحذف الفعلي (اختياري)
        productRow.style.opacity = '0';
        productRow.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            productRow.remove(); // حذفه تماماً من واجهة المستخدم
            
            // 5. استدعاء دوالك المنفصلة لتحديث الحسابات والعداد فوراً
            refreshAllTotals(); // دالة تحديث الإجمالي الكلي والشحن
            updateCartBadge();  // دالة تحديث رقم العداد العائم
            
            // إظهار إشعار منبثق أنيق للزبون
            showBeboNotification("تم إزالة المنتج من السلة بنجاح! 🗑️");
        }, 300); // الانتظار 300 مللي ثانية حتى ينتهي تأثير الاختفاء
    }
}
