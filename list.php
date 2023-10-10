<ul class="">
    <?php 
    $phpFilesDir = '';
    $phpFiles = glob($phpFilesDir . '*.{html}', GLOB_BRACE);
    ?>
    <li class="col-md-12">
        <span class="">Pages</span>
        <ul class="sub-menu">
            <?php foreach ($phpFiles as $key => $value) {?>
                <li class="w-25">
                    <a href="<?php echo $value; ?>"><?php echo $value; ?></a>
                </li>
            <?php } ?>
        </ul>
    </li>
</ul>