import { Component, Input } from "@angular/core";

@Component({
    selector : 'form-btn',
    template : `<button type="submit"
    class="w-full {{ bg }} text-white text-base p-3 rounded-md hover:cursor-pointer border-none border-blue-100 hover: hover:bg-indigo-700 focus:outline-none">{{ value }}</button>`
})
export class FormButtonComponent{
    @Input()bg: string = '';
    @Input()value: string = '';
}