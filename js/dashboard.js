function capitalizeFirstLetter(a) {
    return a.charAt(0).toUpperCase() + a.slice(1)
}

// Use newTabulator from util.js for consistency
var table = newTabulator("#example-table", {
    layout: "fitData",
    placeholder: "No leads found. Please start the extraction in Google Maps.",
    selectable: 1
});

// DOWNLOAD CSV (UNRESTRICTED)
document.getElementById("download-csv").addEventListener("click", function() {
    table.download("csv", "results.csv");
    const b = table.getRows().length;
    console.log(`Download ${b} emails. (Unlimited)`);
});

// DOWNLOAD XLSX (UNRESTRICTED)
document.getElementById("download-xlsx").addEventListener("click", function() {
    table.download("xlsx", "results.xlsx", { sheetName: "My Data" });
    const b = table.getRows().length;
    console.log(`Download ${b} emails. (Unlimited)`);
});

function flattenObject(a, c = "") {
    const d = {};
    for (const [b, e] of Object.entries(a)) 
        a = c ? `${c}_${b}` : b, "object" === typeof e && null !== e ? Object.assign(d, flattenObject(e, a)) : d[a] = e;
    return d
}

function generateColumns(a) {
    const c = new Set("name phone email website address instagram facebook twitter linkedin yelp youtube placeID cID category reviewCount averageRating latitude longitude".split(" "));
    var d = [];
    c.forEach(b => {
        d.push({ title: capitalizeFirstLetter(b), field: b, width: 300, resizable: !0 })
    });
    Array.from(a).sort().forEach(b => {
        c.has(b) || d.push({ title: capitalizeFirstLetter(b), field: b, width: 300, resizable: !0 })
    });
    table.setColumns(d)
}

function showData() {
    chrome.storage.local.get(null, function(a) {
        a = a.leads || [];
        console.log("Leads loaded from storage:", a.length);
        if(a.length === 0) return;
        
        var c = new Set();
        var d = [];
        for (var b = 0; b < a.length; ++b) {
            const e = flattenObject(a[b]);
            d.push(e);
            Object.keys(e).forEach(f => c.add(f))
        }
        generateColumns(c);
        table.setData(d);
    })
}

function normalizeProfileId(a) {
    return a.replace("@", "").trim().toLowerCase()
}

$(document).ready(function() {
    showData();
    // Simplified UI update
    document.getElementById("accountinfo").innerHTML = "Plan: UNLIMITED PRO (Unlocked) ✅";
});
