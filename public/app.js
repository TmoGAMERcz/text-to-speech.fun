document.getElementById('download').addEventListener('click', () => {
    const text = document.getElementById('text').value;

    fetch('/download', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
    })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = 'speech.mp3';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        });
});
