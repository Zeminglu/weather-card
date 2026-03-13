// 更新日期时间
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    document.getElementById('datetime').textContent = now.toLocaleDateString('zh-CN', options);
}

// 模拟天气数据更新
function updateWeatherData() {
    // 模拟温度变化
    const baseTemp = 20 + Math.floor(Math.random() * 8);
    const feelsLike = baseTemp + Math.floor(Math.random() * 3) - 1;
    
    document.getElementById('temp').textContent = baseTemp;
    document.getElementById('feels-like').textContent = feelsLike;
    
    // 模拟其他数据
    document.getElementById('wind-speed').textContent = (3 + Math.random() * 7).toFixed(1);
    document.getElementById('humidity').textContent = Math.floor(50 + Math.random() * 30);
    document.getElementById('uv-index').textContent = Math.floor(1 + Math.random() * 8);
    document.getElementById('cloud-cover').textContent = Math.floor(20 + Math.random() * 60);
    
    // 天气描述和图标
    const weatherTypes = [
        { desc: '晴天', icon: 'fas fa-sun', color: '#ffb347' },
        { desc: '多云', icon: 'fas fa-cloud-sun', color: '#a8c6ff' },
        { desc: '阴天', icon: 'fas fa-cloud', color: '#b0b0b0' },
        { desc: '小雨', icon: 'fas fa-cloud-rain', color: '#4facfe' },
        { desc: '阵雨', icon: 'fas fa-cloud-showers-heavy', color: '#667eea' }
    ];
    
    const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    document.getElementById('weather-desc').textContent = randomWeather.desc;
    const iconElement = document.getElementById('weather-icon');
    iconElement.className = randomWeather.icon;
    iconElement.style.color = randomWeather.color;
    
    // 更新预报
    const forecastItems = document.querySelectorAll('.forecast-item');
    let currentTemp = baseTemp;
    
    forecastItems.forEach((item, index) => {
        const tempChange = Math.floor(Math.random() * 5) - 2;
        currentTemp += tempChange;
        
        const tempElement = item.querySelector('.forecast-temp');
        if (tempElement) {
            tempElement.textContent = currentTemp + '°C';
        }
        
        const iconElement = item.querySelector('.forecast-icon i');
        if (iconElement && index > 0) {
            const forecastWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
            iconElement.className = forecastWeather.icon;
            iconElement.style.color = forecastWeather.color;
        }
    });
}

// 切换城市
function changeLocation() {
    const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市', '成都市', '武汉市', '南京市'];
    const currentCity = document.getElementById('location').textContent;
    let newCity;
    
    do {
        newCity = cities[Math.floor(Math.random() * cities.length)];
    } while (newCity === currentCity && cities.length > 1);
    
    document.getElementById('location').textContent = newCity;
    updateWeatherData();
}

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始更新时间
    updateDateTime();
    updateWeatherData();
    
    // 每秒更新时间
    setInterval(updateDateTime, 1000);
    
    // 每30秒更新一次天气数据（模拟）
    setInterval(updateWeatherData, 30000);
    
    // 按钮事件
    document.getElementById('refresh-btn').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 更新中...';
        updateWeatherData();
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-sync-alt"></i> 刷新天气';
        }, 1000);
    });
    
    document.getElementById('location-btn').addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 切换中...';
        changeLocation();
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-search-location"></i> 切换城市';
        }, 1000);
    });
    
    // 添加一些动画效果
    const detailItems = document.querySelectorAll('.detail-item');
    detailItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// 添加键盘快捷键
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            document.getElementById('refresh-btn').click();
        }
    }
    
    if (event.key === 'l' || event.key === 'L') {
        if (event.ctrlKey || event.metaKey) {
            event.preventDefault();
            document.getElementById('location-btn').click();
        }
    }
});
