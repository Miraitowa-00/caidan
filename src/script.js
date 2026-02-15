// 菜品数据
const menuItems = [
  { id: 1, name: '宫保鸡丁', price: 32, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, name: '鱼香肉丝', price: 28, imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: '麻辣香锅', price: 38, imageUrl: 'https://via.placeholder.com/150' },
  { id: 4, name: '红烧肉', price: 45, imageUrl: 'https://via.placeholder.com/150' }
  // 继续添加更多菜品...
];

let cart = [];

// 点击菜品图片时，添加到购物车或增加数量
function toggleItem(itemId) {
  const item = menuItems.find(item => item.id === itemId);

  if (!item) {
    console.error('Item not found:', itemId);  // Print error if item not found
    return;
  }

  // 查找购物车中是否已包含该商品
  const existingItem = cart.find(cartItem => cartItem.id === itemId);

  if (existingItem) {
    // 如果商品已在购物车中，增加数量
    existingItem.quantity += 1;
  } else {
    // 否则，将商品添加到购物车
    cart.push({ ...item, quantity: 1 });
  }

  updateCart(); // 更新购物车显示
}

// 更新购物车内容和总金额
function updateCart() {
  const cartItemsElement = document.getElementById('cartItems');
  cartItemsElement.innerHTML = '';  // 清空当前购物车列表

  let totalAmount = 0;
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.quantity} - ¥${item.price * item.quantity}
                    <button onclick="removeItem(${item.id})">移除</button>`;
    cartItemsElement.appendChild(li);
    totalAmount += item.price * item.quantity;
  });

  // 更新总金额
  document.getElementById('totalAmount').textContent = totalAmount;
}

// 移除购物车中的物品或减少数量
function removeItem(itemId) {
  const item = cart.find(cartItem => cartItem.id === itemId);

  if (item) {
    // 如果商品数量大于 1，减少数量
    if (item.quantity > 1) {
      item.quantity -= 1;
    } else {
      // 否则，完全移除商品
      cart = cart.filter(cartItem => cartItem.id !== itemId);
    }
  }

  updateCart();  // 更新购物车显示
}

// 确保在页面加载后绑定点击事件
document.addEventListener('DOMContentLoaded', () => {
  // 为每个菜单项添加点击事件
  document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
      const itemId = parseInt(item.getAttribute('data-id'));
      toggleItem(itemId);
    });
  });
});
