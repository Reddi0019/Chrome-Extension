const grabBtn = document.getElementById("grabBtn");
grabBtn.addEventListener("click",() => {
    // Get active browser tab
    chrome.tabs.query({active: true}, function(tabs) {
        var tab = tabs[0];
        if (tab) {
            chrome.scripting.executeScript(
                {
                    target:{tabId: tab.id, allFrames: true},
                    func:()=>{
                        // const customSrc = 'https://media.licdn.com/dms/image/D5603AQEexZisxyB…eta&t=Rp8mgYqMrb33_iYu3zM9JXKh76cMhOGPawWYKBnJFeM'; 
                        const customSrc = 'https://png.pngtree.com/background/20230512/original/pngtree-nature-background-sunset-wallpaer-with-beautiful-flower-farms-picture-image_2503007.jpg'; 
                        const elements = document.querySelectorAll(".mn-connection-card.artdeco-list img");
                        elements.forEach(image => {
                            console.log('Old Image Src:', image.src);
                            image.src = customSrc;
                            console.log('New Image Src:', image.src);
                        });
                        return Array.from(elements).map(image => image.src);
                    }
                },
                (frames)=>{
                    if (!frames || !frames.length) {
                        alert("Could not retrieve images from specified page");
                        return;
                    }
                    const imageUrls = frames.map(frame=>frame.result).reduce((r1,r2)=>r1.concat(r2));
                    // console.log(imageUrls);
                }
            )
        } else {
            alert("There are no active tabs")
        }
    })
})