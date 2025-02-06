document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get("id");

    if (activityId) {
        loadActivityDetail(activityId); 
    } else {
        loadActivityJson("activityContainer");
    }
});

function loadActivityJson(containerId) {
    fetch("../Data/activity.json")
        .then((response) => response.json())
        .then((json) => {
            let activityData = json["data"];
            groupByYear(activityData, containerId);
        })
        .catch((error) => console.error("Error loading activity data:", error));
}

function groupByYear(activityData, containerId) {
    let groupedData = activityData.reduce((acc, activity) => {
        const year = activity.date.split('-')[0];
        if (!acc[year]) acc[year] = [];
        acc[year].push(activity);
        return acc;
    }, {});

    const sortedYears = Object.keys(groupedData).sort((a, b) => b - a); 

    let content = '';
    sortedYears.forEach(year => {
        let yearContent = groupedData[year]
            .map(activity => {
                const formattedDate = formatDate(activity.date);

                return `
                    <div class="activity-item">
                        <a href="activity.html?id=${activity.id}">
                            <img src="${activity.image}" alt="${activity.title}" class="activity-image">
                            <h3 class="activity-title">${activity.title}</h3>
                            <p class="activity-date">${formattedDate}</p>
                        </a>
                    </div>
                `;
            })
            .join('');

        content += `
            <div class="year-group">
                <h2>${year}</h2>
                <div class="year-content">${yearContent}</div>
            </div>
        `;
    });

    document.getElementById(containerId).innerHTML = content;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;  
    const day = date.getDate();
    
    return `${month < 10 ? '0' : ''}${month}.${day < 10 ? '0' : ''}${day}`; 
}

function loadActivityDetail(activityId) {
    fetch("../Data/activity.json")
        .then((response) => response.json())
        .then((json) => {
            let activityData = json["data"];
            let activity = activityData.find((item) => item.id == activityId);
            
            if (activity) {
                let formattedDate = activity.date.replace(/-/g, ".");
                
                let imagesHtml = activity.images && Array.isArray(activity.images) && activity.images.length > 0 ?
                    `<div class="activity-detail-images">
                        ${activity.images.map(image => `<img src="${image}" alt="${activity.title}" class="activity-detail-image">`).join('')}
                    </div>` :
                    `<img src="${activity.image}" alt="${activity.title}" class="activity-detail-image">`;

                document.getElementById("activityContainer").innerHTML = `
                    <div class="activity-detail">
                        <h2>
                            ${activity.title}
                            <span class="activity-date-inline">${formattedDate}</span>
                        </h2>
                        <p>${activity.description}</p>
                        ${imagesHtml}
                    </div>
                `;
            } else {
                document.getElementById("activityContainer").innerHTML = "<p>The post is unavailable.</p>";
            }
        })
        .catch((error) => console.error("Error loading activity detail:", error));
}
