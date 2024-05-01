import { Component, Input } from "@angular/core";

@Component({
    selector : 'reusable-form-input',
    template : `
    <div class="mb-4 mt-8">
    <label for="email" class="block mb-2 text-base text-black font-semibold">{{ label }}</label>
    <input [type]="type" id="email"
      class="form-control  text-indigo-600 placeholder-indigo-600 text-sm rounded-lg  w-full p-3 border-2 border-solid border-indigo-200 focus:border-indigo-600"
      [placeholder]="placeholder" required />
    </div>`
})
export class FormInputReusableComponent{
    @Input() label: string = '';
    @Input() type: string = '';
    @Input() placeholder: string = '';
}