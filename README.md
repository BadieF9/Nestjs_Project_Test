### آزمون پروژه: سیستم مدیریت سفارش سیلو برای برنامه‌نویسان سینیور NestJS

#### هدف آزمون:
این پروژه برای ارزیابی مهارت‌های شما به عنوان یک توسعه‌دهنده ارشد (سینیور) در زمینه‌های زیر طراحی شده است:
- طراحی و توسعه معماری ماژولار و مقیاس‌پذیر.
- پیاده‌سازی امنیت و مدیریت نقش‌ها (RBAC).
- طراحی سیستم کشینگ پیشرفته با استفاده از Decorator و Interceptor.
- توانایی مدیریت پایگاه داده و بهینه‌سازی آن.
- ارائه راه‌حل‌های حرفه‌ای برای مشکلات واقعی.

---

### جزئیات پروژه:

#### شرح کلی پروژه:
شما باید یک سیستم مدیریت سفارش برای سیلوهای ذخیره غلات طراحی کنید که شامل ویژگی‌های زیر باشد:
1. ثبت و مدیریت سفارش‌ها: کشاورزان می‌توانند سفارش‌های جدید ثبت کنند و وضعیت آن‌ها توسط مدیر سیلو تغییر یابد.
2. امنیت و احراز هویت: سیستم باید با استفاده از JWT از امنیت بالایی برخوردار باشد و نقش‌ها (مدیر و کشاورز) به درستی مدیریت شوند.
3. کشینگ پیشرفته: طراحی سیستمی که درخواست‌های پرتکرار را کش کند و قابلیت تنظیم TTL و رفتار کش برای هر اندپوینت داشته باشد.

---

### وظایف شما:

#### مرحله ۱: طراحی مدل داده‌ها
- جداول مورد نیاز را طراحی کنید:
  1. Farmers (کشاورزان): اطلاعات کشاورزان شامل id, name, email, password.
  2. Orders (سفارش‌ها): اطلاعات سفارش‌ها شامل id, farmerId, grainType, quantity, status.
  3. Silos (سیلوها): اطلاعات سیلوها شامل id, capacity, currentStock.
- ارتباطات لازم بین جداول را مشخص کنید:
  - Orders به Farmers با رابطه Many-to-One.

---

#### مرحله ۲: پیاده‌سازی احراز هویت و مدیریت نقش‌ها (RBAC)
- احراز هویت JWT را پیاده‌سازی کنید.
- نقش‌ها را مدیریت کنید:
  - کشاورزان: تنها به سفارش‌های خود دسترسی داشته باشند.
  - مدیران سیلو: بتوانند همه سفارش‌ها را مشاهده و مدیریت کنند.
- از Guards برای کنترل دسترسی استفاده کنید.

---

#### مرحله ۳: مدیریت سفارش‌ها
- API‌های زیر را پیاده‌سازی کنید:
  1. POST /orders: برای ثبت سفارش جدید (فقط کشاورزان).
  2. GET /orders: برای مشاهده سفارش‌ها.
     - کشاورزان: فقط سفارش‌های خود را ببینند.
     - مدیران: همه سفارش‌ها را ببینند.
  3. PATCH /orders/:id: برای تغییر وضعیت سفارش (فقط توسط مدیر).
- از DTO‌ها برای مدیریت داده‌های ورودی استفاده کنید.
- داده‌ها را با Pipes اعتبارسنجی کنید (مثلاً مقدار غله نباید منفی باشد).

---

#### مرحله ۴: کشینگ پیشرفته
- طراحی Interceptor برای مدیریت کش:
  - پاسخ‌های پرتکرار در Redis ذخیره شوند.
  - TTL (زمان انقضا) برای هر اندپوینت قابل تنظیم باشد.
- طراحی Decorator سفارشی برای کشینگ اندپوینت‌ها:
  - مشخص کنید که آیا کشینگ فعال باشد یا غیرفعال.
  - تنظیم TTL برای اندپوینت‌های مختلف.
  - مثال:
        @CustomCache({ ttl: 600 }) // کش ۱۰ دقیقه
    @Get('/orders')
    getOrders() {
      return this.orderService.getAll();
    }
    

ویژگی‌های مورد انتظار کشینگ:
1. برخی اندپوینت‌ها بدون کش باشند (غیرفعال).
2. برخی اندپوینت‌ها TTL متفاوت داشته باشند (مثلاً ۱۰ دقیقه یا ۳۰ دقیقه).
3. رفتار کش برای هر اندپوینت از طریق Decorator قابل تغییر باشد.

---

#### مرحله ۵: امنیت و بهینه‌سازی
- Rate Limiting: برای جلوگیری از حملات Brute Force، محدودیت درخواست‌ها را اعمال کنید.
- جلوگیری از SQL Injection: از ORM برای تعامل با پایگاه داده استفاده کنید.
- بهینه‌سازی کوئری‌ها: برای درخواست‌هایی که داده‌های زیادی بازمی‌گردانند.

---

#### تحویل پروژه:
1. کد خود را در یک ریپازیتوری گیت قرار دهید و دسترسی آن را برای بررسی فراهم کنید.
2. مستندات زیر را ارائه دهید:
   - توضیحات مربوط به طراحی سیستم.
   - نحوه اجرای پروژه (README).
   - چالش‌هایی که با آن مواجه شدید و راه‌حل‌هایی که پیاده‌سازی کردید.

---



این پروژه برای سنجش واقعی توانایی شما طراحی شده است. موفق باشید! 🚀
