const apiUrl = 'https://api.waifu.im/search';  // Replace with the actual API endpoint URL

// Function to display the waifu image and tags
function displayWaifu(data) {
  const waifuContainer = document.getElementById('waifu-container');

  // Check if there is at least one result
  if (data.images.length > 0) {
    const waifu = data.images[0];

    // Create an image element
    const waifuImage = document.createElement('img');
    waifuImage.id = 'waifu-image';
    waifuImage.src = waifu.url;
    waifuImage.alt = 'Waifu Image';

    // Set the height and width as per your preference
    waifuImage.style.height = "600px";
    waifuImage.style.width = "475px"; // Adjust width proportionally

    // Create a div for tags
    const waifuTags = document.createElement('div');
    waifuTags.id = 'waifu-tags';
    waifuTags.innerHTML = `Tags: ${waifu.tags.map(tag => `${tag.name}</>`).join(', ')}`;

    // Append image and tags to the container
    waifuContainer.innerHTML = ''; // Clear previous content
    waifuContainer.appendChild(waifuImage);
    waifuContainer.appendChild(waifuTags);
  } else {
    waifuContainer.innerHTML = '<p>No waifu found.</p>';
  }
}

// Function to fetch the next waifu based on the selected tag
function fetchNextWaifu(selectedTag) {
  const tagParams = {
    included_tags: selectedTag,
    height: '>=3000'
  };

  const tagQueryParams = new URLSearchParams(tagParams);
  const tagRequestUrl = `${apiUrl}?${tagQueryParams}`;

  fetch(tagRequestUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Request failed with status code: ' + response.status);
      }
    })
    .then(data => {
      // Process the response data and display the next waifu
      displayWaifu(data);
    })
    .catch(error => {
      console.error('An error occurred:', error.message);
    });


}

// Add event listener for the "Next Waifu" button
const nextButton = document.getElementById('next-button');
nextButton.addEventListener('click', () => fetchNextWaifu(tagSelect.value));

// Add event listener for tag selection
const tagSelect = document.getElementById('tag-select');
tagSelect.addEventListener('change', () => fetchNextWaifu(tagSelect.value));

// Initial fetch and display when the page loads
fetchNextWaifu('maid'); // Default tag: Maid
