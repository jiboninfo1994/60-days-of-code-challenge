1. User এর Interactive এর ফলে ui তে আমরা যদি কোন change দেখাতে চাই তাহলে আমাদেরকে state এর মাধ্যমে Data change করতে হবে।
2. useState hook use করার ফলে আমরা একটা array touple return পাই। একটা হল তার initial value or variable ও আর একটা হল ওই variable এর মান change করার জন্য একটা set funciton
3. আমরা direct state এর মান change করতে পারব না । যখন আমাদের state এর মান change করতে হবে তখন set function call করার মাধ্যমে value change করতে হবে ।
4. একমাত্র state এর মান change হলেই component render হয় এবং তার replaction ui তে দেখতে পাই।
