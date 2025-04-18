document.addEventListener('webviewerloaded', () => {
  // Get search term from URL
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('highlight'); // e.g., ?highlight=Hello%20World

  if (!searchTerm) return;

  const highlightColor = 'yellow';

  // Function to highlight all spans containing the search term
  const highlightText = () => {
    const textLayers = document.querySelectorAll('.textLayer');
    textLayers.forEach(layer => {
      const spans = layer.querySelectorAll('span');
      spans.forEach(span => {
        const text = span.textContent || '';
        if (text.toLowerCase().includes(searchTerm.toLowerCase())) {
          span.style.backgroundColor = highlightColor;
        }
      });
    });
  };

  // MutationObserver to catch when text layers are rendered
  const observer = new MutationObserver(() => {
    highlightText();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
