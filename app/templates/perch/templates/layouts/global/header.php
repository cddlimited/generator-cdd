<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui">
    <?php perch_page_attributes_extend(array(
        'pageTitle' => perch_pages_title(true)
    )); ?>

    <!-- build:css /styles/vendor.css -->
    <!-- bower:css -->
    <!-- endbower -->
    <!-- endbuild -->

    <!-- build:css /styles/main.css  -->
    <link rel="stylesheet" href="/styles/main.css">
    <!-- endbuild -->

    <?php perch_get_css(); ?>
</head>

<?php 
	if (perch_layout_has('body-class')) {
		echo '<body class="'.perch_layout_var('body-class', true).'">';
	}else{
		echo '<body>';
	}
?>