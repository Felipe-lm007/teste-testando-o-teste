document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('.landing-page');
  if (!root) return;

  const header = root.querySelector('.site-header');
  const menuButton = root.querySelector('.menu-button');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const compactAmbient = matchMedia('(max-width: 767px), (hover: none), (pointer: coarse)');
  const defaultDocumentTitle = document.title;

  const loadDeferredMedia = (container) => {
    container.querySelectorAll('[data-deferred-srcset]').forEach((source) => {
      source.srcset = source.dataset.deferredSrcset;
      source.removeAttribute('data-deferred-srcset');
    });
    container.querySelectorAll('[data-deferred-src]').forEach((image) => {
      image.src = image.dataset.deferredSrc;
      image.removeAttribute('data-deferred-src');
    });
    container.classList.add('media-ready');
  };

  root.querySelectorAll('.postfolio-folder, .services, .contact').forEach((section) => {
    if (!('IntersectionObserver' in window)) {
      loadDeferredMedia(section);
      return;
    }
    const mediaObserver = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      loadDeferredMedia(section);
      observer.disconnect();
    }, { threshold: 0.01, rootMargin: '0px 0px -15% 0px' });
    mediaObserver.observe(section);
  });

  const serviceContent = {
    'pacotes-mensais': { category: 'NOVA FASE', title: 'Pacotes mensais', subtitle: 'Confira o que inclui cada pacote e os valores.', description: '', audience: '', benefit: '' },
    'nail-art': { category: 'UNHAS', title: 'Nail art', subtitle: 'Criações personalizadas para o seu estilo.', description: 'Arte feita à mão e adaptada às suas referências, cores e personalidade.', audience: 'Quem deseja unhas autorais e um acabamento exclusivo.', benefit: 'Um visual personalizado, cuidado em cada detalhe.', prices: [
      { name: 'Nail Art N1', value: 'a partir de R$ 15,00' },
      { name: 'Nail Art N2', value: 'a partir de R$ 25,00' },
      { name: 'Nail Art N3', value: 'a partir de R$ 40,00' },
      { name: 'Personalizada / alta complexidade', value: 'a partir de R$ 50,00 — sob orçamento' },
    ], images: [
      { src: './assets/nail-art-session-hello-kitty-retouched-web.jpg', alt: 'Nail art branca em relevo inspirada na Hello Kitty' },
      { src: './assets/nail-art-session-money-purple-retouched-web.jpg', alt: 'Nail art autoral roxa com detalhes em relevo e estampa de dinheiro' },
      { src: './assets/nail-art-session-purple-galaxy-retouched-web.jpg', alt: 'Conjunto de nail art roxa com estrelas, espirais e aplicações' },
    ] },
    'banho-em-gel': { category: 'UNHAS', title: 'Banho em gel', subtitle: 'Proteção e resistência para as unhas naturais.', description: 'Uma camada de gel é aplicada sobre a unha natural para reforçar sua estrutura.', audience: 'Unhas naturais que precisam de mais resistência no dia a dia.', benefit: 'Proteção e acabamento uniforme, preservando o comprimento natural.', prices: [
      { name: 'Banho em Gel', value: 'R$ 90,00' },
      { name: 'Manutenção de Banho em Gel', value: 'R$ 80,00' },
    ], images: [
      { src: './assets/banho-em-gel-telefone-retouched-web.jpg', alt: 'Unhas vermelhas com banho em gel segurando um telefone' },
      { src: './assets/banho-em-gel-rosa-retouched-web.jpg', alt: 'Unhas rosadas com banho em gel e brilho delicado' },
      { src: './assets/banho-em-gel-amarelo-natural-retouched-web.jpg', alt: 'Banho em gel com francesinha amarela e detalhes florais delicados' },
    ] },
    alongamentos: { category: 'UNHAS', title: 'Alongamentos', subtitle: 'Comprimento e formato com acabamento natural.', description: 'A extensão é construída e modelada de acordo com o formato escolhido.', audience: 'Quem busca mais comprimento ou deseja harmonizar o formato das unhas.', benefit: 'Unhas alongadas com proporção e acabamento natural.', prices: [
      { name: 'Postiça Realista simples', value: 'R$ 60,00' },
      { name: 'Postiça Realista + Nail Art N2', value: 'R$ 80,00' },
      { name: 'Postiça Realista + Nail Art N3', value: 'R$ 100,00' },
      { name: 'Alongamento', value: 'R$ 130,00' },
      { name: 'Manutenção de Alongamento', value: 'R$ 90,00' },
    ], images: [
      { src: './assets/alongamento-francesinha-reboco-web.jpg', alt: 'Alongamento de unhas amendoadas com francesinha branca e detalhes dourados' },
      { src: './assets/alongamento-branco-retouched-web.jpg', alt: 'Alongamento de unhas amendoadas com acabamento branco perolado' },
      { src: './assets/alongamento-francesinha-celular-retouched-web.jpg', alt: 'Alongamento de unhas amendoadas com francesinha branca segurando um celular azul' },
    ] },
    'esmaltacao-em-gel': { category: 'UNHAS', title: 'Esmaltação em gel', subtitle: 'Cor intensa, brilho e maior durabilidade.', description: 'Esmaltação curada em cabine para um acabamento brilhante e uniforme.', audience: 'Quem procura praticidade e cor bonita por mais tempo.', benefit: 'Brilho intenso e acabamento resistente à rotina.', prices: [
      { name: 'Mãos', value: 'R$ 70,00' },
      { name: 'Pés', value: 'R$ 70,00' },
    ], images: [
      { src: './assets/esmaltacao-gel-francesinha-retouched-web.jpg', alt: 'Esmaltação em gel rosada com francesinha branca' },
      { src: './assets/esmaltacao-gel-vermelha-retouched-web.jpg', alt: 'Esmaltação em gel vermelha com acabamento brilhante' },
      { src: './assets/esmaltacao-gel-caramelo-retouched-web.jpg', alt: 'Esmaltação em gel caramelo com acabamento brilhante' },
    ] },
    'pedicure-em-gel': { category: 'UNHAS', title: 'Esmaltação em gel nos pés + reconstrução', subtitle: 'Cuidado completo, proteção e reconstrução.', description: 'Cuidado dos pés com esmaltação em gel e reconstrução estética quando necessária.', audience: 'Quem deseja acabamento durável e correção visual de pequenas irregularidades.', benefit: 'Unhas cuidadas, protegidas e com aparência uniforme.', prices: [
      { name: 'Esmaltação em Gel nos Pés + Reconstrução', value: 'R$ 80,00' },
    ], images: [
      { src: './assets/pedicure-gel-francesinha-retouched-web.jpg', alt: 'Pedicure em gel rosada com francesinha branca' },
      { src: './assets/pedicure-gel-sandalias-retouched-web.jpg', alt: 'Pedicure em gel com francesinha branca e sandálias brilhantes' },
      { src: './assets/pedicure-gel-reconstruction-before-after-natural-v3-web.jpg', alt: 'Antes e depois de esmaltação em gel nos pés com reconstrução', className: 'before-after-full-frame' },
    ] },
    'esmaltacao-tradicional': { category: 'UNHAS', title: 'Pedicure tradicional', subtitle: 'Cuidado clássico para os pés.', description: 'Preparação cuidadosa dos pés e aplicação de esmalte convencional na cor escolhida.', audience: 'Quem prefere o cuidado clássico e gosta de variar as cores.', benefit: 'Pés bem cuidados com acabamento delicado e fácil de renovar.', prices: [
      { name: 'Pedicure Tradicional', value: 'R$ 45,00' },
    ], images: [
      { src: './assets/esmaltacao-tradicional-rosa-retouched-web.jpg', alt: 'Esmaltação tradicional rosa nos pés' },
      { src: './assets/esmaltacao-tradicional-vinho-retouched-web.jpg', alt: 'Esmaltação tradicional vinho nos pés' },
      { src: './assets/esmaltacao-tradicional-branca-retouched-web.jpg', alt: 'Esmaltação tradicional branca nos pés' },
    ] },
    'design-com-henna': { category: 'SOBRANCELHAS', title: 'Design com henna', subtitle: 'Definição e preenchimento com efeito natural.', description: 'Design finalizado com henna para preencher visualmente áreas mais espaçadas.', audience: 'Quem deseja mais definição sem perder a naturalidade.', benefit: 'Contorno valorizado e efeito de preenchimento equilibrado.', prices: [
      { name: 'Design com Henna', value: 'R$ 45,00' },
    ], images: [
      { src: './assets/design-com-henna-4-clean-web.jpg', alt: 'Design de sobrancelhas com henna em cliente de cabelos cacheados', className: 'preserve-full-frame' },
      { src: './assets/design-com-henna-3-enhanced.jpeg', alt: 'Design de sobrancelhas com henna em cliente de olhos fechados', className: 'preserve-full-frame' },
      { src: './assets/design-com-henna-3-balanced-lips-web.jpg', alt: 'Design de sobrancelhas com henna em cliente de cabelos escuros entre flores', className: 'preserve-full-frame' },
    ] },
    'design-personalizado': { category: 'SOBRANCELHAS', title: 'Design simples', subtitle: 'Mapeamento pensado para valorizar o seu rosto.', description: 'Mapeamento individual que respeita os traços, proporções e crescimento natural dos fios.', audience: 'Quem busca um formato harmonioso e feito sob medida.', benefit: 'Sobrancelhas alinhadas à expressão e às características do rosto.', prices: [{ name: 'Design simples', value: 'R$ 25,00' }], images: [
      { src: './assets/design-simples-1-balanced-web.jpg', alt: 'Design simples de sobrancelhas em cliente de olhos fechados', className: 'brow-focus-design-3' },
      { src: './assets/design-simples-2-balanced-web.jpg', alt: 'Design simples de sobrancelhas com acabamento definido', className: 'brow-focus-design-2' },
      { src: './assets/design-simples-3-balanced-web.jpg', alt: 'Design simples de sobrancelhas em cliente de blusa rosa', className: 'brow-focus-design-1' },
    ] },
    'brow-lamination': { category: 'SOBRANCELHAS', title: 'Brow Lamination sem henna', subtitle: 'Fios alinhados, modelados e com mais presença.', description: 'Técnica de alinhamento que modela os fios e destaca o desenho das sobrancelhas.', audience: 'Fios desalinhados ou quem gosta de um efeito mais encorpado.', benefit: 'Fios organizados, flexíveis e visualmente mais definidos.', prices: [{ name: 'Brow Lamination sem Henna', value: 'R$ 85,00' }], images: [
      { src: './assets/brow-lamination-sem-henna-retouched-web.jpg', alt: 'Resultado de Brow Lamination sem henna em cliente de cabelos escuros', className: 'brow-no-henna-focus-existing' },
      { src: './assets/brow-lamination-sem-henna-1-balanced-web.jpg', alt: 'Brow Lamination sem henna em cliente de cabelos longos e escuros', className: 'brow-no-henna-focus-dark' },
      { src: './assets/brow-lamination-sem-henna-2-balanced-web.jpg', alt: 'Brow Lamination sem henna em cliente de cabelos com mechas', className: 'brow-no-henna-focus-highlights' },
    ] },
    'brow-lamination-com-henna': { category: 'SOBRANCELHAS', title: 'Brow Lamination com henna', subtitle: 'Alinhamento e preenchimento para destacar o olhar.', description: 'A técnica alinha e modela os fios, com finalização em henna para preencher e definir o desenho.', audience: 'Quem deseja fios organizados, mais presença e efeito de preenchimento.', benefit: 'Sobrancelhas alinhadas, definidas e com acabamento mais marcante.', prices: [{ name: 'Brow Lamination com Henna', value: 'R$ 100,00' }], images: [
      { src: './assets/brow-lamination-com-henna-retouched-web.jpg', alt: 'Resultado de Brow Lamination com henna em cliente de cabelos escuros', className: 'brow-henna-focus-existing' },
      { src: './assets/brow-lamination-com-henna-2-balanced-web.jpg', alt: 'Brow Lamination com henna em cliente de blusa branca', className: 'brow-henna-focus-white' },
      { src: './assets/brow-lamination-com-henna-1-balanced-web.jpg', alt: 'Brow Lamination com henna finalizada com escovinha', className: 'brow-henna-focus-spoolie' },
    ] },
  };

  const serviceContactMessages = {
    'nail-art': 'Oi, desejo fazer uma nail art.',
    'banho-em-gel': 'Oi, desejo fazer um banho em gel.',
    alongamentos: 'Oi, desejo fazer um alongamento de unhas.',
    'esmaltacao-em-gel': 'Oi, desejo fazer uma esmaltação em gel.',
    'pedicure-em-gel': 'Oi, desejo fazer esmaltação em gel nos pés com reconstrução.',
    'esmaltacao-tradicional': 'Oi, desejo fazer uma pedicure tradicional.',
    'design-com-henna': 'Oi, desejo fazer um design de sobrancelhas com henna.',
    'design-personalizado': 'Oi, desejo fazer um design simples de sobrancelhas.',
    'brow-lamination': 'Oi, desejo fazer Brow Lamination sem henna.',
    'brow-lamination-com-henna': 'Oi, desejo fazer Brow Lamination com henna.',
  };

  root.querySelectorAll('[data-package-whatsapp]').forEach((link) => {
    const packageName = link.dataset.packageWhatsapp;
    const message = `Oi, gostaria de agendar o pacote ${packageName}.`;
    link.href = `https://wa.me/557996311098?text=${encodeURIComponent(message)}`;
    link.setAttribute('aria-label', `Agendar o pacote ${packageName} pelo WhatsApp`);
  });

  const serviceView = root.querySelector('[data-service-view]');
  const serviceBack = root.querySelector('[data-service-close]');
  const servicePageElements = [...root.children].filter((element) =>
    !element.matches('.ambient-canvas, .ambient-readout, .site-header, [data-service-view]'),
  );
  let serviceReturnScroll = 0;
  let serviceReturnFocus = null;
  let serviceGalleryIndex = 0;
  let serviceGallerySwipeStart = null;

  const galleryShell = serviceView?.querySelector('[data-service-gallery-shell]');
  const galleryTrack = serviceView?.querySelector('[data-service-gallery]');
  const galleryDots = serviceView?.querySelector('[data-service-gallery-dots]');
  const galleryStatus = serviceView?.querySelector('[data-service-gallery-status]');
  const galleryPrevious = serviceView?.querySelector('[data-service-gallery-prev]');
  const galleryNext = serviceView?.querySelector('[data-service-gallery-next]');
  const servicePrices = serviceView?.querySelector('[data-service-prices]');

  const showServiceGalleryImage = (requestedIndex) => {
    const slides = [...(galleryTrack?.children || [])];
    if (!slides.length) return;
    serviceGalleryIndex = (requestedIndex + slides.length) % slides.length;
    galleryTrack.style.setProperty('--service-gallery-index', serviceGalleryIndex);
    slides.forEach((slide, index) => {
      const active = index === serviceGalleryIndex;
      slide.setAttribute('aria-hidden', String(!active));
      slide.classList.toggle('is-active', active);
    });
    [...(galleryDots?.children || [])].forEach((dot, index) => {
      dot.classList.toggle('is-active', index === serviceGalleryIndex);
      if (index === serviceGalleryIndex) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
    if (galleryStatus) galleryStatus.textContent = `${serviceGalleryIndex + 1} de ${slides.length}`;
  };

  const renderServiceGallery = (service) => {
    if (!galleryTrack || !galleryDots || !galleryShell) return;
    const images = service.images || (service.image ? [{ src: service.image, alt: service.imageAlt || '' }] : []);
    galleryTrack.replaceChildren(...images.map((item, index) => {
      const figure = document.createElement('figure');
      figure.className = 'service-detail-photo';
      if (item.className) figure.classList.add(item.className);
      const image = document.createElement('img');
      image.src = item.src;
      image.alt = item.alt;
      image.decoding = 'async';
      if (index > 0) image.loading = 'lazy';
      figure.append(image);
      return figure;
    }));
    galleryDots.replaceChildren(...images.map((item, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver foto ${index + 1} de ${images.length}`);
      dot.addEventListener('click', () => showServiceGalleryImage(index));
      return dot;
    }));
    galleryShell.classList.toggle('has-multiple-images', images.length > 1);
    showServiceGalleryImage(0);
  };

  const updateServiceView = (service, key) => {
    const isMonthly = key === 'pacotes-mensais';
    serviceView.dataset.serviceKey = key;
    serviceView.classList.toggle('service-monthly-view', isMonthly);
    serviceView.querySelector('[data-service-category]').textContent = service.category;
    serviceView.querySelector('[data-service-title]').textContent = service.title;
    serviceView.querySelector('[data-service-subtitle]').textContent = service.subtitle;
    serviceView.querySelector('[data-service-description]').textContent = service.description;
    serviceView.querySelector('[data-service-audience]').textContent = service.audience;
    serviceView.querySelector('[data-service-benefit]').textContent = service.benefit;
    servicePrices?.replaceChildren(...(service.prices || []).map((price) => {
      const row = document.createElement('div');
      const name = document.createElement('dt');
      const value = document.createElement('dd');
      name.textContent = price.name;
      value.textContent = price.value;
      row.append(name, value);
      return row;
    }));
    renderServiceGallery(service);
    const contact = serviceView.querySelector('[data-service-contact]');
    const message = serviceContactMessages[key] || `Oi, desejo fazer ${service.title}.`;
    contact.href = `https://wa.me/557996311098?text=${encodeURIComponent(message)}`;
    contact.setAttribute('aria-label', `Agendar ${service.title} pelo WhatsApp`);
    document.title = `${service.title} | Isabelle Rosa Beauty Space`;
  };

  let activePageTransition = null;

  const isTransitionAbort = (error) =>
    error instanceof DOMException && error.name === 'AbortError';

  const runPageTransition = async (update) => {
    if (reducedMotion.matches) return update();
    if (document.startViewTransition) {
      activePageTransition?.skipTransition?.();
      const transition = document.startViewTransition(update);
      activePageTransition = transition;
      try {
        await transition.finished;
      } catch (error) {
        if (!isTransitionAbort(error)) throw error;
      } finally {
        if (activePageTransition === transition) activePageTransition = null;
      }
      return;
    }
    const exitAnimation = root.animate(
      { opacity: [1, 0] },
      { duration: 180, easing: 'ease-out', fill: 'forwards' },
    );
    try {
      await exitAnimation.finished;
    } catch (error) {
      if (!isTransitionAbort(error)) throw error;
    }
    update();
    root.getAnimations().forEach((animation) => animation.cancel());
    const enterAnimation = root.animate(
      { opacity: [0, 1] },
      { duration: 320, easing: 'ease-out' },
    );
    try {
      await enterAnimation.finished;
    } catch (error) {
      if (!isTransitionAbort(error)) throw error;
    }
  };

  const openServiceView = async (key, savePosition = true) => {
    const service = serviceContent[key];
    if (!service || !serviceView) return;
    if (savePosition && !root.classList.contains('service-view-is-open')) {
      serviceReturnScroll = scrollY;
      serviceReturnFocus = document.activeElement;
    }
    await runPageTransition(() => {
      updateServiceView(service, key);
      serviceView.hidden = false;
      servicePageElements.forEach((element) => { element.inert = true; });
      root.classList.add('service-view-is-open');
      scrollTo(0, 0);
    });
    serviceBack?.focus({ preventScroll: true });
  };

  const closeServiceView = async () => {
    if (!serviceView || serviceView.hidden) return;
    await runPageTransition(() => {
      root.classList.remove('service-view-is-open');
      serviceView.hidden = true;
      servicePageElements.forEach((element) => { element.inert = false; });
      document.title = defaultDocumentTitle;
      let targetId = location.hash.startsWith('#') ? location.hash.slice(1) : '';
      try {
        targetId = decodeURIComponent(targetId);
      } catch {
        // Keep the literal hash when it contains malformed escape sequences.
      }
      const target = targetId && !targetId.startsWith('servico/')
        ? document.getElementById(targetId)
        : null;
      if (target) target.scrollIntoView({ block: 'start' });
      else scrollTo(0, serviceReturnScroll);
    });
    if (serviceReturnFocus instanceof HTMLElement) serviceReturnFocus.focus({ preventScroll: true });
  };

  root.addEventListener('click', (event) => {
    const serviceLink = event.target.closest('[data-service-open]');
    if (!serviceLink) return;
    event.preventDefault();
    const key = serviceLink.dataset.serviceOpen;
    history.pushState({ service: key }, '', serviceLink.hash);
    openServiceView(key);
  });

  serviceBack?.addEventListener('click', () => {
    history.replaceState({}, '', '#servicos');
    closeServiceView();
  });

  serviceView?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showServiceGalleryImage(serviceGalleryIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showServiceGalleryImage(serviceGalleryIndex + 1);
    }
    if (event.key === 'Escape') {
      history.replaceState({}, '', '#servicos');
      closeServiceView();
    }
  });

  galleryPrevious?.addEventListener('click', () => showServiceGalleryImage(serviceGalleryIndex - 1));
  galleryNext?.addEventListener('click', () => showServiceGalleryImage(serviceGalleryIndex + 1));
  galleryShell?.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'touch') serviceGallerySwipeStart = event.clientX;
  });
  galleryShell?.addEventListener('pointerup', (event) => {
    if (event.pointerType !== 'touch' || serviceGallerySwipeStart === null) return;
    const distance = event.clientX - serviceGallerySwipeStart;
    serviceGallerySwipeStart = null;
    if (Math.abs(distance) >= 45) showServiceGalleryImage(serviceGalleryIndex + (distance < 0 ? 1 : -1));
  });
  galleryShell?.addEventListener('pointercancel', () => {
    serviceGallerySwipeStart = null;
  });

  const syncServiceRoute = () => {
    const key = location.hash.startsWith('#servico/')
      ? location.hash.slice('#servico/'.length)
      : '';
    if (serviceContent[key]) openServiceView(key, false);
    else closeServiceView();
  };

  addEventListener('hashchange', syncServiceRoute);

  const initialService = location.hash.startsWith('#servico/')
    ? location.hash.slice('#servico/'.length)
    : '';
  if (serviceContent[initialService]) openServiceView(initialService, false);

  const menu = document.createElement('nav');
  menu.id = 'mobile-menu';
  menu.className = 'mobile-menu';
  menu.setAttribute('aria-label', 'Navegação móvel');
  menu.hidden = true;
  menu.innerHTML = `
    <button type="button" aria-label="Fechar menu">×</button>
    <i class="mobile-menu-orb mobile-menu-orb-one" aria-hidden="true"></i>
    <i class="mobile-menu-orb mobile-menu-orb-two" aria-hidden="true"></i>
    <i class="mobile-menu-orb mobile-menu-orb-three" aria-hidden="true"></i>
    <strong class="mobile-menu-brand">Isabelle Rosa <small>Beauty Space</small></strong>
    <p class="mobile-menu-kicker">MENU / NAVEGAÇÃO</p>
    <div class="mobile-menu-links">
      <a href="#top" data-menu-index="01">início</a>
      <a href="#servicos" data-menu-index="02">serviços</a>
      <a href="#contato" data-menu-index="03">contato</a>
    </div>
    <span class="mobile-menu-signature">BELEZA COM ATITUDE. <b>ARACAJU — SE</b></span>`;
  root.appendChild(menu);

  let focusBeforeMenu = null;
  let menuCloseTimer = null;
  const menuCloseButton = menu.querySelector('button');
  const menuLinks = [...menu.querySelectorAll('a')];

  const setMenu = (open, restoreFocus = true) => {
    if (!menuButton) return;
    clearTimeout(menuCloseTimer);
    if (open) {
      focusBeforeMenu = document.activeElement;
      menu.hidden = false;
      menu.classList.remove('is-closing');
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
        menuCloseButton?.focus();
      });
    } else {
      menu.classList.remove('is-open');
      menu.classList.add('is-closing');
      const finishClose = () => {
        menu.hidden = true;
        menu.classList.remove('is-closing');
        if (restoreFocus && focusBeforeMenu instanceof HTMLElement)
          focusBeforeMenu.focus();
      };
      if (reducedMotion.matches) finishClose();
      else menuCloseTimer = setTimeout(finishClose, 420);
    }
    document.body.classList.toggle('menu-is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  menuButton?.addEventListener('click', () => {
    setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
  });
  menuCloseButton?.addEventListener('click', () => setMenu(false));
  menuLinks.forEach((link) =>
    link.addEventListener('click', () => setMenu(false, false)),
  );

  const desktopNavigation = matchMedia('(min-width: 768px)');
  const closeMenuOnDesktop = (event) => {
    if (event.matches && !menu.hidden) setMenu(false, false);
  };
  desktopNavigation.addEventListener?.('change', closeMenuOnDesktop);

  document.addEventListener('keydown', (event) => {
    if (menu.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      setMenu(false);
      return;
    }
    if (event.key !== 'Tab') return;
    const focusable = [menuCloseButton, ...menuLinks].filter(Boolean);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const revealItems = root.querySelectorAll(
    '.about-isabelle-intro, .about-poster-photo, .section-heading, .contact-headline, .corner-photo-stack, .memory-photo-strip, .contact-closing-copy, .contact-final-card',
  );
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }),
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );
    revealItems.forEach((item) => observer.observe(item));
  }

  const folderExperience = root.querySelector('[data-folder-experience]');
  if (folderExperience) {
    const folderPoster = folderExperience.closest('.about-poster');
    const folderPages = [...folderExperience.querySelectorAll('[data-folder-page]')];
    const previousButton = folderExperience.querySelector('[data-folder-prev]');
    const nextButtons = [...folderExperience.querySelectorAll('[data-folder-next]')];
    const nextNavigationButton = folderExperience.querySelector('.folder-nav-next');
    const pageButtons = [...folderExperience.querySelectorAll('[data-folder-go]')];
    const folderStatus = folderExperience.querySelector('.folder-status');
    let currentFolderPage = 0;
    let swipeStartX = null;

    const showFolderPage = (requestedPage) => {
      const nextPage = Math.max(0, Math.min(folderPages.length - 1, requestedPage));
      currentFolderPage = nextPage;

      folderPages.forEach((page, index) => {
        const active = index === currentFolderPage;
        page.classList.toggle('is-active', active);
        page.classList.toggle('is-before', index < currentFolderPage);
        page.setAttribute('aria-hidden', String(!active));
        page.inert = !active;
      });

      folderPoster?.classList.toggle('folder-is-open', currentFolderPage > 0);
      folderPoster?.classList.toggle('folder-is-first-page', currentFolderPage === 0);
      if (previousButton) previousButton.disabled = currentFolderPage === 0;
      nextButtons.forEach((button) => {
        button.disabled = currentFolderPage === folderPages.length - 1;
      });

      pageButtons.forEach((button, index) => {
        if (index === currentFolderPage) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });

      const activePage = folderPages[currentFolderPage];
      const pageName = activePage?.dataset.pageName || `Página ${currentFolderPage + 1}`;
      if (folderStatus)
        folderStatus.textContent = `${pageName} — ${currentFolderPage + 1} de ${folderPages.length}`;
      previousButton?.setAttribute(
        'aria-label',
        currentFolderPage > 0
          ? `Voltar para ${folderPages[currentFolderPage - 1]?.dataset.pageName}`
          : 'Você está na capa',
      );
      nextNavigationButton?.setAttribute(
        'aria-label',
        currentFolderPage < folderPages.length - 1
          ? `Avançar para ${folderPages[currentFolderPage + 1]?.dataset.pageName}`
          : 'Você está na última página',
      );
    };

    previousButton?.addEventListener('click', () =>
      showFolderPage(currentFolderPage - 1),
    );
    nextButtons.forEach((button) =>
      button.addEventListener('click', () => {
        showFolderPage(currentFolderPage + 1);
        if (button.classList.contains('folder-open-button'))
          requestAnimationFrame(() => nextNavigationButton?.focus());
      }),
    );
    pageButtons.forEach((button) =>
      button.addEventListener('click', () =>
        showFolderPage(Number(button.dataset.folderGo)),
      ),
    );

    folderExperience.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft' && currentFolderPage > 0) {
        event.preventDefault();
        showFolderPage(currentFolderPage - 1);
      }
      if (event.key === 'ArrowRight' && currentFolderPage < folderPages.length - 1) {
        event.preventDefault();
        showFolderPage(currentFolderPage + 1);
      }
    });

    folderExperience.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') swipeStartX = event.clientX;
    });
    folderExperience.addEventListener('pointerup', (event) => {
      if (swipeStartX === null || event.pointerType !== 'touch') return;
      const distance = event.clientX - swipeStartX;
      swipeStartX = null;
      if (Math.abs(distance) < 45) return;
      showFolderPage(currentFolderPage + (distance < 0 ? 1 : -1));
    });
    folderExperience.addEventListener('pointercancel', () => {
      swipeStartX = null;
    });

    showFolderPage(0);
  }

  const portfolioCover = root.querySelector('.postfolio-folder');
    const currentPortfolio = root.querySelector('[data-current-portfolio]');
    const enterPortfolioButton = root.querySelector('[data-enter-portfolio]');
    const closePortfolioButton = root.querySelector('[data-close-current-portfolio]');
    const currentPages = [...root.querySelectorAll('[data-current-page]')];
    const currentPreviousButton = root.querySelector('[data-current-prev]');
    const currentNextButton = root.querySelector('[data-current-next]');
    const currentPageButtons = [...root.querySelectorAll('[data-current-go]')];
    let currentPortfolioPage = 0;
    let currentSwipeStartX = null;
    let finishCurrentPageTurn = null;

    const animateCurrentPageTurn = (previousPage, nextPage) => {
      if (previousPage === nextPage || reducedMotion.matches ||
          currentPortfolio?.getAttribute('aria-hidden') !== 'false') return;
      const outgoing = currentPages[previousPage];
      const incoming = currentPages[nextPage];
      if (!outgoing || !incoming) return;
      currentPortfolio.dataset.turnDirection = nextPage > previousPage ? 'forward' : 'backward';
      outgoing.classList.add('is-turning-out');
      incoming.classList.add('is-turning-in');
      let fallbackTimer;
      const finish = () => {
        clearTimeout(fallbackTimer);
        outgoing.removeEventListener('animationend', onEnd);
        outgoing.classList.remove('is-turning-out');
        incoming.classList.remove('is-turning-in');
        delete currentPortfolio.dataset.turnDirection;
        finishCurrentPageTurn = null;
      };
      const onEnd = (event) => {
        if (event.target === outgoing) finish();
      };
      outgoing.addEventListener('animationend', onEnd);
      fallbackTimer = setTimeout(finish, 920);
      finishCurrentPageTurn = finish;
    };
    reducedMotion.addEventListener?.('change', () => {
      if (reducedMotion.matches) finishCurrentPageTurn?.();
    });

    const showCurrentPortfolioPage = (requestedPage, loadMedia = true) => {
      const nextPage = Math.max(0, Math.min(currentPages.length - 1, requestedPage));
      if (!Number.isInteger(nextPage)) return;
      finishCurrentPageTurn?.();
      const previousPage = currentPortfolioPage;
      const moveFocus = previousPage !== nextPage &&
        currentPages[previousPage]?.contains(document.activeElement);
      currentPortfolioPage = nextPage;
      const requestedElement = currentPages[currentPortfolioPage];
      if (loadMedia) {
        requestedElement?.querySelectorAll('[data-portfolio-srcset]').forEach((source) => {
          source.srcset = source.dataset.portfolioSrcset;
          source.removeAttribute('data-portfolio-srcset');
        });
        requestedElement?.querySelectorAll('[data-portfolio-src]').forEach((image) => {
          image.src = image.dataset.portfolioSrc;
          image.removeAttribute('data-portfolio-src');
        });
      }
      currentPages.forEach((page, index) => {
        const active = index === currentPortfolioPage;
        page.classList.toggle('is-active', active);
        page.classList.toggle('is-before', index < currentPortfolioPage);
        page.setAttribute('aria-hidden', String(!active));
        page.inert = !active;
      });
      currentPageButtons.forEach((button, index) => {
        if (index === currentPortfolioPage) button.setAttribute('aria-current', 'page');
        else button.removeAttribute('aria-current');
      });
      if (currentPreviousButton) currentPreviousButton.disabled = currentPortfolioPage === 0;
      if (currentNextButton) currentNextButton.disabled = currentPortfolioPage === currentPages.length - 1;
      if (loadMedia) animateCurrentPageTurn(previousPage, currentPortfolioPage);
      if (moveFocus) {
        const focusTarget = currentNextButton?.disabled ? currentPreviousButton : currentNextButton;
        focusTarget?.focus({ preventScroll: true });
      }
    };

    const setPortfolioOpen = (open) => {
      const portfolioScene = portfolioCover?.querySelector('.postfolio-scene');
      if (!portfolioScene || !currentPortfolio) return;
      finishCurrentPageTurn?.();

      if (open) {
        currentPortfolio.querySelectorAll('[data-portfolio-srcset]').forEach((source) => {
          source.srcset = source.dataset.portfolioSrcset;
          source.removeAttribute('data-portfolio-srcset');
        });
        currentPortfolio.querySelectorAll('[data-portfolio-src]').forEach((image) => {
          image.src = image.dataset.portfolioSrc;
          image.removeAttribute('data-portfolio-src');
          image.decode?.().catch(() => {});
        });
        showCurrentPortfolioPage(0);
        portfolioScene.classList.add('is-current-portfolio-open');
        currentPortfolio.setAttribute('aria-hidden', 'false');
        currentPortfolio.inert = false;
        enterPortfolioButton?.setAttribute('aria-expanded', 'true');
        requestAnimationFrame(() => closePortfolioButton?.focus());
        return;
      }

      portfolioScene.classList.remove('is-current-portfolio-open');
      currentPortfolio.setAttribute('aria-hidden', 'true');
      currentPortfolio.inert = true;
      enterPortfolioButton?.setAttribute('aria-expanded', 'false');
      requestAnimationFrame(() => enterPortfolioButton?.focus());
    };

    enterPortfolioButton?.addEventListener('click', () => setPortfolioOpen(true));
    closePortfolioButton?.addEventListener('click', () => setPortfolioOpen(false));
    currentPreviousButton?.addEventListener('click', () => showCurrentPortfolioPage(currentPortfolioPage - 1));
    currentNextButton?.addEventListener('click', () => showCurrentPortfolioPage(currentPortfolioPage + 1));
    currentPageButtons.forEach((button) =>
      button.addEventListener('click', () => showCurrentPortfolioPage(Number(button.dataset.currentGo))),
    );
    currentPortfolio?.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setPortfolioOpen(false);
      if (event.key === 'ArrowLeft') showCurrentPortfolioPage(currentPortfolioPage - 1);
      if (event.key === 'ArrowRight') showCurrentPortfolioPage(currentPortfolioPage + 1);
    });
    currentPortfolio?.addEventListener('pointerdown', (event) => {
      if (event.pointerType === 'touch') currentSwipeStartX = event.clientX;
    });
    currentPortfolio?.addEventListener('pointerup', (event) => {
      if (currentSwipeStartX === null || event.pointerType !== 'touch') return;
      const distance = event.clientX - currentSwipeStartX;
      currentSwipeStartX = null;
      if (Math.abs(distance) < 45) return;
      showCurrentPortfolioPage(currentPortfolioPage + (distance < 0 ? 1 : -1));
    });
    currentPortfolio?.addEventListener('pointercancel', () => {
      currentSwipeStartX = null;
    });
    showCurrentPortfolioPage(0, false);
    if (currentPortfolio) currentPortfolio.inert = true;

  let scrollFrame = 0;
  let mobileScrollIdle = 0;
  const pauseMobileMotion = () => {
    if (!compactAmbient.matches) return;
    root.classList.add('is-mobile-scrolling');
    clearTimeout(mobileScrollIdle);
  };
  const resumeMobileMotionSoon = () => {
    if (!compactAmbient.matches) return;
    clearTimeout(mobileScrollIdle);
    mobileScrollIdle = setTimeout(() => root.classList.remove('is-mobile-scrolling'), 220);
  };
  const updateScroll = () => {
    scrollFrame = 0;
    header?.classList.toggle('is-scrolled', scrollY > 32);
  };
  const requestScroll = () => {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    pauseMobileMotion();
    resumeMobileMotionSoon();
  };
  addEventListener('scroll', requestScroll, { passive: true });
  addEventListener('resize', requestScroll, { passive: true });
  addEventListener('touchstart', pauseMobileMotion, { passive: true });
  addEventListener('touchend', resumeMobileMotionSoon, { passive: true });
  addEventListener('touchcancel', resumeMobileMotionSoon, { passive: true });
  updateScroll();


  const ambientCanvas = root.querySelector('.ambient-canvas');
  const readout = root.querySelector('.ambient-readout span');
  // Fixed canvases are particularly expensive in iOS Safari because the
  // browser chrome changes the visual viewport while the user scrolls. The
  // compact layout uses a CSS background instead, so do not even allocate a
  // canvas backing store on touch/mobile devices.
  if (ambientCanvas instanceof HTMLCanvasElement && !compactAmbient.matches) {
    const context = ambientCanvas.getContext('2d', { alpha: false });
    const pointer = { x: 0.5, y: 0.5 };
    const smooth = { x: 0.5, y: 0.5 };
    const orbs = [
      [0.12, 0.18, 0.34, 0.23, 0.2, 0],
      [0.82, 0.16, 0.29, 0.31, 1.4, 42],
      [0.28, 0.72, 0.38, 0.19, 2.2, 88],
      [0.72, 0.76, 0.33, 0.27, 3.1, 136],
      [0.48, 0.42, 0.25, 0.37, 4.2, 188],
      [0.9, 0.5, 0.3, 0.21, 5.4, 248],
    ];
    let width = 0;
    let height = 0;
    let ambientRequest = 0;
    let readoutFrame = 0;

    const resizeAmbient = (force = false) => {
      const nextWidth = innerWidth;
      const nextHeight = innerHeight;
      // Mobile browsers resize the visual viewport while their address bar
      // appears during an upward scroll. Reallocating the canvas on every one
      // of those height-only changes is expensive and makes the page stutter.
      if (!force && compactAmbient.matches && width && Math.abs(nextWidth - width) < 2)
        return false;
      const ratio = Math.min(devicePixelRatio || 1, 1.35);
      width = nextWidth;
      height = nextHeight;
      ambientCanvas.width = Math.round(width * ratio);
      ambientCanvas.height = Math.round(height * ratio);
      ambientCanvas.style.width = `${width}px`;
      ambientCanvas.style.height = `${height}px`;
      context?.setTransform(ratio, 0, 0, ratio, 0, 0);
      return true;
    };

    const renderAmbient = (time = 0) => {
      if (!context) return;
      smooth.x += (pointer.x - smooth.x) * 0.055;
      smooth.y += (pointer.y - smooth.y) * 0.055;
      const hue = 216;
      const saturation = 76;
      context.globalCompositeOperation = 'source-over';
      context.fillStyle = '#020611';
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      const bloomX = smooth.x * width;
      const bloomY = smooth.y * height;
      const bloomRadius = Math.max(width, height) * (width <= 760 ? 0.42 : 0.34);
      const bloom = context.createRadialGradient(
        bloomX,
        bloomY,
        0,
        bloomX,
        bloomY,
        bloomRadius,
      );
      bloom.addColorStop(
        0,
        'hsl(216 82% 30% / .22)',
      );
      bloom.addColorStop(
        0.28,
        'hsl(222 76% 18% / .085)',
      );
      bloom.addColorStop(1, 'transparent');
      context.fillStyle = bloom;
      context.fillRect(
        bloomX - bloomRadius,
        bloomY - bloomRadius,
        bloomRadius * 2,
        bloomRadius * 2,
      );

      orbs.forEach(([x0, y0, size, speed, phase]) => {
        const seconds = time * 0.001 * speed;
        const x = (x0 + Math.sin(seconds + phase) * 0.15) * width;
        const y = (y0 + Math.cos(seconds * 1.17 + phase) * 0.13) * height;
        const radius = Math.max(width, height) * size;
        const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(
          0,
          'hsl(216 86% 25% / .17)',
        );
        gradient.addColorStop(
          0.42,
          'hsl(224 76% 15% / .065)',
        );
        gradient.addColorStop(1, 'transparent');
        context.fillStyle = gradient;
        context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
      });
      if (readoutFrame++ % 8 === 0 && readout) {
        readout.textContent = `${Math.round(hue)}° · ${Math.round(saturation)}%`;
        root.style.setProperty('--ambient-hue', String(Math.round(hue)));
      }
      ambientRequest = reducedMotion.matches || compactAmbient.matches || document.hidden
        ? 0
        : requestAnimationFrame(renderAmbient);
    };

    const startAmbient = () => {
      if (
        !ambientRequest
        && !document.hidden
        && !reducedMotion.matches
        && !compactAmbient.matches
      )
        ambientRequest = requestAnimationFrame(renderAmbient);
    };
    const stopAmbient = () => {
      cancelAnimationFrame(ambientRequest);
      ambientRequest = 0;
    };
    const handleVisibility = () => (document.hidden ? stopAmbient() : startAmbient());
    const resetAmbient = () => {
      stopAmbient();
      resizeAmbient(true);
      renderAmbient(0);
      requestScroll();
    };

    const updatePointer = (clientX, clientY) => {
        pointer.x = Math.max(0, Math.min(1, clientX / innerWidth));
        pointer.y = Math.max(0, Math.min(1, clientY / innerHeight));
        root.style.setProperty('--pointer-x', String((pointer.x - 0.5) * 2));
        root.style.setProperty('--pointer-y', String((pointer.y - 0.5) * 2));
        root.style.setProperty('--cursor-x', `${clientX}px`);
        root.style.setProperty('--cursor-y', `${clientY}px`);
        if (reducedMotion.matches) {
          smooth.x = pointer.x;
          smooth.y = pointer.y;
          renderAmbient(0);
        }
    };
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    if (finePointer.matches) {
      addEventListener('pointermove', (event) => updatePointer(event.clientX, event.clientY), {
        passive: true,
      });
      addEventListener('pointerdown', (event) => updatePointer(event.clientX, event.clientY), {
        passive: true,
      });
    }

    let ambientResizeFrame = 0;
    const requestAmbientResize = () => {
      if (ambientResizeFrame) return;
      ambientResizeFrame = requestAnimationFrame(() => {
        ambientResizeFrame = 0;
        if (resizeAmbient() && (compactAmbient.matches || reducedMotion.matches))
          renderAmbient(0);
      });
    };

    addEventListener('resize', requestAmbientResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    reducedMotion.addEventListener?.('change', resetAmbient);
    compactAmbient.addEventListener?.('change', resetAmbient);
    resizeAmbient(true);
    renderAmbient(0);
  }

});
