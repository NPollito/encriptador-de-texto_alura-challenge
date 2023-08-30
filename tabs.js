//convertir los nodelis en arrays = Array.from(elements)
const tabs = Array.from(document.querySelectorAll('.tabs__list'));
const panels = Array.from(document.querySelectorAll('.panels__items'));

document.getElementById('tabs').addEventListener('click', evt => {

    if( evt.target.classList.contains('tabs__list') ) {

        
        const indice = tabs.indexOf(evt.target)

        //remover todas las clases 'tabs__list--active'
        tabs.map(tab => tab.classList.remove('tabs__list--active'));
        //activar la clase 'tabs__list--active'
        tabs[indice].classList.add('tabs__list--active');

        panels.map(panel => panel.classList.remove('panels__items--active'));
        panels[indice].classList.add('panels__items--active');
    }

})
