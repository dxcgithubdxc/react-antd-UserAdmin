// 格式化ant-design 的 Tree data.
export default function FormatTreeData(data) {
    const lines = {};
    for (let i = 0; i < data.length; i++) {
        const linename = data[i][1];
        const line = lines[linename];
        if (line === undefined) {
            lines[linename] = { key: data[i][0], title: data[i][1] };
        }
        const stations = lines[linename].stations;
        if (stations === undefined) {
            lines[linename].stations = {};
        }
        if (lines[linename].stations[data[i][3]] === undefined) {
            lines[linename].stations[data[i][3]] = { key: data[i][2], title: data[i][3] };
        }
        const devices = lines[linename].stations[data[i][3]].devices;
        if (devices === undefined) {
            lines[linename].stations[data[i][3]].devices = [];
        }
        lines[linename].stations[data[i][3]].devices.push({ key: data[i][4], title: data[i][5] });
    }
    const treeData = [];
    for (const line in lines) {
        const lineData = {};
        lineData.title = lines[line].title;
        lineData.key = lines[line].key;
        lineData.children = [];
        for (const station in lines[line].stations) {
            const stationData = {};
            stationData.title = lines[line].stations[station].title;
            stationData.key = lines[line].stations[station].key;
            stationData.children = lines[line].stations[station].devices;
            lineData.children.push(stationData);
        }
        treeData.push(lineData);
    }
    return treeData;
}
