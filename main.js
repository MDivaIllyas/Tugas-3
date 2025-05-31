const transaction = [
    { id: "TXN001", customer: "Alice Johnson", amount: 1200.50, date: "2025-04-01", type: "credit" },
    { id: "TXN002", customer: "Bob Smith", amount: 950.00, date: "2025-03-15", type: "debit" },
    { id: "TXN003", customer: "Charlie Brown", amount: 150.75, date: "2025-04-10", type: "credit" },
    { id: "TXN004", customer: "Diana Prince", amount: 2000.00, date: "2025-03-21", type: "debit" },
    { id: "TXN005", customer: "Edward Lee", amount: 850.25, date: "2025-04-03", type: "credit" },
    { id: "TXN006", customer: "Fiona Adams", amount: 330.00, date: "2025-04-12", type: "debit" },
    { id: "TXN007", customer: "George Wayne", amount: 1400.40, date: "2025-03-18", type: "credit" },
    { id: "TXN008", customer: "Helen Clark", amount: 625.30, date: "2025-04-02", type: "credit" },
    { id: "TXN009", customer: "Isaac Newton", amount: 1900.90, date: "2025-04-11", type: "debit" },
    { id: "TXN010", customer: "Jackie Chan", amount: 1020.60, date: "2025-03-30", type: "debit" },
    { id: "TXN011", customer: "Kevin Hart", amount: 875.00, date: "2025-04-07", type: "credit" },
    { id: "TXN012", customer: "Laura Palmer", amount: 199.99, date: "2025-03-20", type: "credit" },
    { id: "TXN013", customer: "Mike Ross", amount: 950.25, date: "2025-04-05", type: "debit" },
    { id: "TXN014", customer: "Nina Dobrev", amount: 675.45, date: "2025-04-06", type: "credit" },
    { id: "TXN015", customer: "Oscar Wilde", amount: 1250.00, date: "2025-04-09", type: "credit" },
    { id: "TXN016", customer: "Peter Parker", amount: 420.20, date: "2025-04-04", type: "debit" },
    { id: "TXN017", customer: "Quinn Fabray", amount: 1100.00, date: "2025-04-08", type: "debit" },
    { id: "TXN018", customer: "Rachel Green", amount: 780.55, date: "2025-03-25", type: "credit" },
    { id: "TXN019", customer: "Steve Rogers", amount: 2100.75, date: "2025-04-13", type: "debit" },
    { id: "TXN020", customer: "Tony Stark", amount: 3000.00, date: "2025-03-28", type: "credit" }
];

const dataTransaction = document.getElementById("data-transaction");

let showTransaction = (transaction) => {``
    dataTransaction.innerHTML = ``;

    if (!transaction || transaction.length === 0) {
        dataTransaction.innerHTML = `
        <tr>
            <td colspan="5">There's no transaction.</td>
        </tr>
        `;
        return;
    }

    transaction.forEach(data => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${data.id}</td>
            <td>${data.customer}</td>
            <td>${data.amount.toFixed(2)}</td>
            <td>${data.date}</td>
            <td>${data.type}</td>
        `;
        dataTransaction.append(row)
    });
}

const sortTransaction = document.getElementById("submit-sort");

sortTransaction.addEventListener('click', (e) =>{
    e.preventDefault();
    const groupSort = document.getElementById("group-sort").value;
    const sortBy = document.getElementById("sort-data").value;
    const algoSort = document.getElementById("sort-algo").value;

    const bubbleSort = (group, sortBy, transaction) => {
        const length = transaction.length;

        if(sortBy === 'asc'){
            for(let i = 0; i < length; i++){
                for(let j = 0; j < length - i - 1; j++){
                    if(transaction[j][group] > transaction[j+1][group]){
                        const current = j;
                        const next = j+1;
    
                        let temp = transaction[next];
                        transaction[next] = transaction[current];
                        transaction[current] = temp;
                    }
                }
            }
        }
        else{
            for(let i = 0; i < length; i++){
                for(let j = 0; j < length - i - 1; j++){
                    if(transaction[j][group] < transaction[j+1][group]){
                        const current = j;
                        const next = j+1;
    
                        let temp = transaction[next];
                        transaction[next] = transaction[current];
                        transaction[current] = temp;
                    }
                }
            }
        }
        
    }

    const mergeSort = (group, sortBy, transaction) => {
        const length = transaction.length;
        
        if(length <= 1) return transaction;

        const mid = Math.floor(length/2);
        const left = mergeSort(group, sortBy, transaction.slice(0, mid));
        const right = mergeSort(group, sortBy, transaction.slice(mid, length));

        return merge(left, right, group, sortBy);
    }

    const merge = (left, right, group, sortBy) => {
        const data = [];
        let l = r = 0;

        if(sortBy === 'asc'){
            while(l < left.length && r < right.length){
                if(left[l][group] < right[r][group]){
                    data.push(left[l]);
                    l++;
                }
                else{
                    data.push(right[r]);
                    r++;
                }
            }
        }
        else{
            while(l < left.length && r < right.length){
                if(left[l][group] > right[r][group]){
                    data.push(left[l]);
                    l++;
                }
                else{
                    data.push(right[r]);
                    r++;
                }
            }
        }
        
        while(l < left.length){
                data.push(left[l]);
                l++;
        }
        
        while(r < right.length){
            data.push(right[r]);
            r++;
        }

        return data;
    }


    if(algoSort === 'bubble'){
        bubbleSort(groupSort, sortBy, transaction);
    }
    else{
        let sorted = mergeSort(groupSort, sortBy, transaction);
        transaction.length = 0;
        transaction.push(...sorted);
    }


    

    showTransaction(transaction);
})

const searchTransaction = document.getElementById("submit-search");

searchTransaction.addEventListener('click', (e) => {
    e.preventDefault();

    const type = document.getElementById('search-algo').value;
    const keyword = document.getElementById('search').value.trim().toLowerCase();

    let result = [];

    const binarySearch = (arr, target) => {
        let left = 0;
        let right = arr.length - 1;

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const midValue = arr[mid].id.toLowerCase();
            const targetValue = target.toLowerCase(); // samakan case

            if (midValue === targetValue) {
                return mid;
            } else if (midValue < targetValue) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return -1;
    };



    if (type === 'linear') {
        result = transaction.filter(item => 
            item.customer.toLowerCase().includes(keyword)
        );
    } else if (type === 'binary') {
        const targetId = keyword;

        const sorted = [...transaction].sort((a, b) => a.id.localeCompare(b.id));


        const index = binarySearch(sorted, targetId);

        if (index !== -1) {
            result.push(sorted[index]);
        }
    }

    showTransaction(result);
});

showTransaction(transaction);