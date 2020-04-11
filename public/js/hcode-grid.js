class Grid {

    constructor(configs) {

        this.options = Object.assign({}, {
            formCreate:'#modal-create form',
            formUpdate:'#modal-update form',
            btnUpdate:'.btn-update',
            btnDelete:'.btn-delete',
        }, configs);

        this.init();
        this.initButtons();

    }

    init() {
        // create data
        this.formCreate = document.querySelector(this.options.formCreate);

        this.formCreate.save().then(json=> {

        window.location.reload();

        }).catch(err=>{
        console.log(err);
        });

        // update data
        this.formUpdate = document.querySelector(this.options.formUpdate);

        this.formUpdate.save().then(json=> {

        window.location.reload();

        }).catch(err=>{
        console.log(err);
        });
    }

    initButtons() {
        // update data
        [...document.querySelectorAll(this.options.btnUpdate)].forEach(btn => {
            btn.addEventListener('click', e => {
            let tr = e.path.find(el => {

                return (el.tagName.toUpperCase() === 'TR');

            });

            this.data = JSON.parse(tr.dataset.row);

            for (let name in data) {
                
                let input = formUpdate.querySelector(`[name=${name}]`);

                switch (name) {
                
                case 'date':
                    if (input) input.value = moment(data[name]).format('YYYY-MM-DD');
                break;

                default:
                    if (input) input.value = data[name];
                }
            }

            $('#modal-update').modal('show');

            });
        });

        [...document.querySelectorAll(this.options.btnDelete)].forEach(btn=>{

        btn.addEventListener('click', e=> {

            let tr = e.path.find(el => {

            return (el.tagName.toUpperCase() === 'TR');

            });

            let data = JSON.parse(tr.dataset.row);

            if (confirm(eval('`'+this.options.deleteMsg+'`'))) {
            fetch(eval('`'+this.options.deleteUrl+'`'), {
            method: 'DELETE'
            }).then(response => response.json())
            .then(json => {
                
                window.location.reload();

            });
            }

        });

        });
    }
}