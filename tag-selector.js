
const TagSelector = {
    render: async function(selector, userOptions) {
        // Default options
        const options = {
            placeholder: 'Type to filter...',
            delimiter: ',',
            inputClass: '',
            tagClass: '',
            tagContainerClass: '',
            tags : [], // Tag must have a name and a value
            ...userOptions,
        }

        //Get element from id
        const element = document.getElementById(selector);

        let selectedTags = [];

        // Change the element to a hidden input
        element.type = 'hidden';

        // Create the input element
        const input = document.createElement('div');
        input.className = `is-tag-selector-container ${options.inputClass}`;

        // Create input search element
        const inputSearch = document.createElement('input');
        inputSearch.type = 'text';
        inputSearch.placeholder = options.placeholder;
        inputSearch.className = 'is-tag-selector-input';
        inputSearch.addEventListener('focus', function() {
            input.classList.add('is-tag-selector-focused');
        });
        inputSearch.addEventListener('blur', function() {
            input.classList.remove('is-tag-selector-focused');
        });
        inputSearch.addEventListener('input', function() {
            const filter = this.value.toLowerCase();
            const tags = tagsContainer.querySelectorAll('.is-tag-selector-tag');
            tags.forEach(tag => {
                tag.classList.add('is-tag-selector-filtered');
                if (tag.textContent.toLowerCase().includes(filter)) {
                    tag.classList.remove('is-tag-selector-filtered');
                }
            });
        });
        input.appendChild(inputSearch);

        // Create tags container
        const tagsContainer = document.createElement('div');
        tagsContainer.className = `is-tag-selector-tags ${options.tagContainerClass}`;

        //Insert tags into the container
        options.tags.forEach(tag => {
            const tagElement = document.createElement('a');
            tagElement.className = `is-tag-selector-tag ${options.tagClass}`;
            tagElement.textContent = tag.name;
            tagElement.dataset.value = tag.value;
            tagsContainer.appendChild(tagElement);

            //Create remove tag button
            const removeTagButton = document.createElement('span');
            removeTagButton.className = 'is-tag-selector-remove-tag';
            removeTagButton.textContent = '✕';
            tagElement.appendChild(removeTagButton);

            // Add click event to remove the tag
            tagElement.addEventListener('click', function(ev) {
                ev.preventDefault();

                if (selectedTags.includes(this.dataset.value)) {
                    // Remove the tag from the selected tags
                    selectedTags = selectedTags.filter(tag => tag !== this.dataset.value);

                    // Remove the tag element from the container
                    this.remove();

                    this.classList.remove('is-tag-selector-selected');

                    // Update the hidden input value
                    element.value = selectedTags.join(options.delimiter);

                    // Update tags container
                    tagsContainer.appendChild(tagElement);
                }
                else {
                    // Add the tag to the selected tags
                    selectedTags = [...selectedTags, this.dataset.value];

                    // Remove the tag element from the container
                    this.remove();

                    this.classList.add('is-tag-selector-selected');

                    // Update the hidden input value
                    element.value = selectedTags.join(options.delimiter);

                    // Update tags container
                    input.prepend(tagElement);
                }

                console.log(element.value);
            });
        });

        // Insert input and container into body after the element
        element.parentNode.insertBefore(tagsContainer, element.nextSibling);
        element.parentNode.insertBefore(input, element.nextSibling);
    }
};