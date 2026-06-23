const screenshotModules = import.meta.glob('/src/gameplay_images/**/*.{png,jpg,jpeg,PNG,JPG,JPEG}', { eager: true, import: 'default' });

const projectFolderMap = {
    1: 'ai_dinner_table',
    2: 'cockatoo_clicker',
    3: 'ghost_notes',
    4: 'gem_finder',
    5: 'sushi_cat',
    6: 'gudetamas_escape',
    7: 'chinese_room',
    8: 'longlingo',
    9: 'trackle',
    10: 'the_trolley_problem'
};

// Group files by project folder
const imagesByFolder = {};

Object.keys(screenshotModules).forEach(filePath => {
    // Matches gameplay_images/{folder}/{filename} at the end of the path
    const match = filePath.match(/gameplay_images\/([^\/]+)\/([^\/]+)$/);
    if (match) {
        const folder = match[1];
        const filename = match[2];
        
        let url = screenshotModules[filePath];
        
        // Strip leading '/public' if Vite left it in the resolved path
        if (url.startsWith('/public/')) {
            url = url.substring(7);
        }
        
        if (!imagesByFolder[folder]) {
            imagesByFolder[folder] = [];
        }
        imagesByFolder[folder].push({
            filename,
            url
        });
    }
});

// Sort files in each folder numerically (e.g. 1.png, 2.png, 10.png)
Object.keys(imagesByFolder).forEach(folder => {
    imagesByFolder[folder].sort((a, b) => {
        const numA = parseInt(a.filename.split('.')[0], 10);
        const numB = parseInt(b.filename.split('.')[0], 10);
        return numA - numB;
    });
});

export function getGameplayImages(projectId) {
    const folder = projectFolderMap[projectId];
    if (!folder) return [];
    return (imagesByFolder[folder] || []).map(img => img.url);
}
