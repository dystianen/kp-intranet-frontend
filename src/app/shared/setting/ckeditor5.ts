import { environment } from 'environments/environment';

export const ckeditor5Conf = {
    config: {
        placeholder: 'Type the content here!',
        toolbar: {
            items: [
                'heading',
                '|',
                'fontfamily',
                'fontsize',
                'alignment',
                'fontColor',
                'fontBackgroundColor',
                '|',
                'bold',
                'italic',
                'strikethrough',
                'underline',
                'subscript',
                'superscript',
                '|',
                'link',
                '|',
                'outdent',
                'indent',
                '|',
                'bulletedList',
                '-',
                'numberedList',
                'todoList',
                '|',
                'mathType',
                '|',
                'code',
                'codeBlock',
                '|',
                'insertTable',
                '|',
                'imageUpload',
                'blockQuote',
                '|',
                'todoList',
                'undo',
                'redo',
            ],
        },
        // plugins: [ SimpleUploadAdapter],
        image: {
            // Configure the available styles.
            styles: ['alignLeft', 'alignCenter', 'alignRight'],

            // Configure the available image resize options.
            resizeOptions: [
                {
                    name: 'resizeImage:original',
                    label: 'Original',
                    value: null,
                },
                {
                    name: 'resizeImage:50',
                    label: '25%',
                    value: '25',
                },
                {
                    name: 'resizeImage:50',
                    label: '50%',
                    value: '50',
                },
                {
                    name: 'resizeImage:75',
                    label: '75%',
                    value: '75',
                },
            ],
            toolbar: [
                'imageStyle:alignLeft',
                'imageStyle:alignCenter',
                'imageStyle:alignRight',
                '|',
                'ImageResize',
                '|',
                'imageTextAlternative',
            ],
        },
        simpleUpload: {
            uploadUrl: `${environment.apiPtnUrl}/admin/soal/upload-media`,
        },
    },
};
