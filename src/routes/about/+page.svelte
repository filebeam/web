<script>
    import { WEB_PUBLIC_INSTANCE } from "$env/static/public";

    import Logo from "$components/branding/Logo.svelte";
    import Button from "$components/Button.svelte";
    import Card from "$components/Card.svelte";

    import IconExclamation from "~icons/tabler/alert-circle";
    import IconExternal from "~icons/tabler/external-link";
    import IconGitHub from "~icons/tabler/brand-github";
    import IconShield from "~icons/tabler/shield";
    import IconBooks from "~icons/tabler/books";
    import IconBook from "~icons/tabler/book-2";

    import { version } from "~build/package";

    const forbiddenExtensions = [
        "js",
        "jar",
        "scr",
        "cpl",
        "jsp",
        "doc",
        "docx",
        "exe",
        "sh",
    ];

    const socials = [
        {
            icon: IconGitHub,
            href: "https://github.com/filebeam",
        },
    ];
</script>

<svelte:head>
    <title>Acerca de ~ Filebeam</title>
</svelte:head>

<main
    class="
      h-full gap-4 space-y-4 px-6
      md:columns-2
      xl:columns-3
    ">
    <Card class="flex flex-col items-center justify-center gap-4 text-center">
        <Logo class="w-64 max-w-[80%]" />
        <div class="flex w-full flex-row justify-center gap-4 text-xl">
            {#each socials as social}
                <a
                    class="
                      text-black/60
                      dark:text-white/60 dark:hover:text-white
                      hover:text-black
                    "
                    target="_blank"
                    href={social.href}>
                    <social.icon />
                </a>
            {/each}
        </div>
        <p class="font-bold opacity-60">
            @filebeam/web {version}
            <br />
            Licenciado bajo AGPL-3.0
        </p>
        {#if WEB_PUBLIC_INSTANCE === "true"}
            <div class="flex flex-col items-center gap-2">
                <Button icon={IconBook} href="/terms">
                    Términos y condiciones de uso
                </Button>
                <Button icon={IconShield} href="/privacy">
                    Política de privacidad
                </Button>
            </div>
        {/if}
    </Card>

    {#if WEB_PUBLIC_INSTANCE === "true"}
        <Card
            class="
              flex flex-col items-center justify-center gap-2 !border-red-400/60
              bg-gradient-to-b from-red-500/10 to-transparent text-center
              dark:border-red/60
            ">
            <IconExclamation class="size-14" />
            <h1 class="text-xl font-bold">Reportar abuso</h1>
            <p class="text-balance opacity-80">
                Puedes reportar un enlace si crees que infringe los términos de
                uso de Filebeam o si consideras que podría estar violando
                derechos de autor
            </p>
            <Button class="mt-2" href="/abuse">Reportar un enlace</Button>
        </Card>
    {/if}

    <Card class="flex flex-col items-center justify-center gap-2 text-center">
        <IconBooks class="size-14" />
        <h1 class="text-xl font-bold">Documentación de la API</h1>
        <p class="text-balance opacity-80">
            La documentación de la API está disponible en GitHub
        </p>
        <Button
            class="mt-2"
            target="_blank"
            icon={IconExternal}
            href="https://github.com/filebeam/api">
            Ir al repositorio de la API
        </Button>
    </Card>

    <Card class="flex flex-col gap-4">
        <h1>¿Qué es Filebeam?</h1>
        <p>
            Filebeam es un servicio de hosting de archivos inspirado en
            <a target="_blank" href="https://catbox.moe">Catbox</a>
            y similares, siendo una alternativa más la cual te permite
            <strong>
                compartir archivos a través de enlaces directos de forma
                gratuita
            </strong>, puedes usar estos enlaces directos para, por ejemplo:
        </p>
        <ul>
            <li>Saltarse limitaciones en aplicaciones como Discord</li>
            <li>Compartir e incrustar imágenes en sitios web</li>
            <li>
                Transferir archivos rápidamente (tan rápido como tu velocidad de
                subida y la que nuestro servidor permita)
            </li>
        </ul>
        <p>
            Además, Filebeam
            <strong> es software libre y de código abierto </strong>
            distribuido bajo la licencia <strong>AGPL-3.0</strong>, lo que te
            permite alojar Filebeam en tu propio servidor y utilizar el código
            fuente como desees, siempre y cuando cumplas con los términos de la
            licencia.
        </p>
    </Card>

    <Card class="flex flex-col gap-4">
        <h1>¿Qué NO es Filebeam?</h1>
        <p>
            Filebeam <strong>
                NO es un servicio de almacenamiento en la nube privado
            </strong>
            (como por ejemplo, Google Drive, MEGA, etc), y no debe ser usado como
            tal.
        </p>
        <p>
            <strong>Todos los archivos subidos a Filebeam son públicos</strong>
            (al menos por el tiempo especificado durante la subida de los mismos
            en el caso de los archivos temporales), Filebeam
            <strong>
                NO debe ser usado para subir información sensible, personal o
                privada.
            </strong>
        </p>
        <p>
            Al compartir archivos en Filebeam, este almacena una copia exacta
            (1:1) del archivo original. Incluyendo, por ejemplo. Los metadatos
            EXIF en las imágenes.
            <strong>
                Estos metadatos pueden incluir información sensible, por lo que
                es tu responsabilidad como usuario verificar el contenido de los
                archivos que compartes.
            </strong>
        </p>
        <p>
            La administración de Filebeam no se hace responsable del uso
            indebido del servicio. Para más información sobre como son manejados
            tus datos y archivos, asegúrate de leer los
            <a href="/terms">Términos y condiciones de uso</a> y la
            <a href="/privacy">Política de privacidad</a>.
        </p>
    </Card>

    <Card class="flex flex-col gap-4">
        <h1>¿Qué tipo de archivos se permiten?</h1>
        <p>
            Por lo general Filebeam no tiene restricciones altamente estrictas,
            pero para evitar el mal uso del servicio, hay algunas limitaciones
            sobre qué puedes subir y qué no.
        </p>
        <h2>Contenido prohibido</h2>
        <p>
            Se permite el almacenamiento de cualquier tipo de contenido
            incluyendo material explícito siempre y cuando sea legal, no
            infrinja ninguna ley o regulación vigente, no sea perjudicial,
            amenazante, difamatorio, ofensivo, violento, o incite al odio.
            Cualquier tipo de material ilegal que no sea capaz de cumplir con
            las restricciones anteriores será eliminado de forma inmediata y se
            tomarán las medidas correspondientes.
        </p>
        <h2>Extensiones prohibidas</h2>
        <div class="flex w-full flex-row flex-wrap gap-2">
            {#each forbiddenExtensions as extension}
                <span
                    class="
                      rounded-lg border-2 border-white-800 bg-white-500 px-3
                      py-0.5
                      dark:border-black-50 dark:bg-black-200
                    ">
                    {extension}
                </span>
            {/each}
        </div>
        <h2>Otras restricciones</h2>
        <ul>
            <li>
                El tamaño máximo de subida para los archivos permanentes es de
                200 MB. Para los archivos temporales, este tamaño limite es de 1
                GB.
            </li>
            <li>
                Para evitar el abuso del servicio, los archivos de marcado o
                scripting como
                <span class="font-bold"> PHP, HTML, CSS, JS, etc. </span>
                serán servidos como archivos de texto plano.
            </li>
        </ul>
        <p>
            No seguir las regulaciones anteriores, puede resultar en la
            terminación o prohibición del servicio.
        </p>
        <p>
            Para información mas detallada respecto a la terminación del
            servicio, leer los
            <a href="/terms">Términos y condiciones de uso</a>.
        </p>
    </Card>
</main>
