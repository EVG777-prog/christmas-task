import { Module } from "./module";
import { Router } from "./router";
import { View } from "./view";
import { Setting } from "./setting";

import { homePageHTML } from "./pages/home";

const router = new Router();

Setting.loadAll();
View.renderHomePage();

if (Module.selected.length > 0) {
  if (document.querySelector('.header__count-toys')) {
    document.querySelector('.header__count-toys')!.textContent = String(Module.selected.length);
  }
}

window.addEventListener('click', function abc(event) {
  playAudio();
  this.removeEventListener('click', abc)
});

document.querySelector('.header__volume')?.addEventListener('click', playAudio);

function playAudio(): void {
  const volume = document.querySelector('.header__volume') as HTMLElement;
  const audio = document.querySelector('audio');
  if (audio?.paused && volume) {
    audio.currentTime = 0;
    audio?.play();
    volume.style.backgroundImage = 'url("../assets/svg/audio.svg")';

  } else {
    audio?.pause();
    volume.style.backgroundImage = 'url("../assets/svg/mute.svg")';
  }
}

window.addEventListener('beforeunload', () => {
  console.log(Setting.reset);
  if (!Setting.reset) {
    Setting.saveAll();
  }
});

document.querySelector('.header__search')?.addEventListener('input', (el) => {

  const target = el.target as HTMLElement & { value: string };

  if (window.location.hash !== '#select') View.renderSelectPage();

  View.showToys(Module.searchNameToys(target.value));
});

document.querySelector('.header__reset')?.addEventListener('click', Setting.resetAll);

console.log(`
Доброго времени суток!
Снега нет, гирлянды нет.
Сохраняет текущее состояние елки и количества оставшихся игрушек, но пока полностью сохранение не доделал.
Громкость вынес в заголовок - мне кажется, так более правильно.
RESET в заголовке сбрасывает LocalStorage и все настройки
Спасибо за проверку и удачи!
`)