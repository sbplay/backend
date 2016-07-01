<?php
namespace TYPO3\CMS\Backend\ViewHelpers;

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
use TYPO3\CMS\Backend\Backend\Avatar\Avatar;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\Core\ViewHelper\AbstractViewHelper;
use TYPO3Fluid\Fluid\Core\Rendering\RenderingContextInterface;

/**
 * Get avatar for backend user
 */
class AvatarViewHelper extends AbstractViewHelper
{
    /**
     * As this ViewHelper renders HTML, the output must not be escaped.
     *
     * @var bool
     */
    protected $escapeOutput = false;

    /**
     * Initializes the arguments
     */
    public function initializeArguments()
    {
        parent::initializeArguments();
        $this->registerArgument('backendUser', 'int', 'Uid of the user', false, 0);
        $this->registerArgument('size', 'int', 'width and height of the image', false, 32);
        $this->registerArgument('showIcon', 'bool', 'show the record icon', false, false);
    }

    /**
     * Resolve user avatar from backend user id.
     *
     * @return string html image tag
     */
    public function render()
    {
        return static::renderStatic(
            $this->arguments,
            $this->buildRenderChildrenClosure(),
            $this->renderingContext
        );
    }

    /**
     * Resolve user avatar from backend user id.
     *
     * @param array $arguments
     * @param \Closure $renderChildrenClosure
     * @param RenderingContextInterface $renderingContext
     * @return string
     */
    public static function renderStatic(array $arguments, \Closure $renderChildrenClosure, RenderingContextInterface $renderingContext)
    {
        if ($arguments['backendUser'] > 0) {
            $backendUser = $GLOBALS['TYPO3_DB']->exec_SELECTgetSingleRow('*', 'be_users', 'uid=' . (int)$arguments['backendUser']);
        } else {
            $backendUser = $GLOBALS['BE_USER']->user;
        }
        /** @var Avatar $avatar */
        $avatar = GeneralUtility::makeInstance(Avatar::class);
        return $avatar->render($backendUser, $arguments['size'], $arguments['showIcon']);
    }
}
